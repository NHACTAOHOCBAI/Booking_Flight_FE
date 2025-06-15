import React, { useState, useEffect, useMemo } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useGetAllTickets } from '@/hooks/useTicket'

interface IProp {
  openNotification: (check?: number) => void
  flightDetails: IFlightTable & { selectedSeat: ISeat }
  selectedSeats: {
    id: string
    seatNumber: number
  }[]
  setSelectedSeats: React.Dispatch<
    React.SetStateAction<
      {
        id: string
        seatNumber: number
      }[]
    >
  >
}

interface Seat {
  id: string // Đây sẽ là UUID của vé (ITicket.id)
  status: string
  seatNumber: number // Đây sẽ là số ghế tuần tự (ITicket.seatNumber)
  row: number // Hàng logic để hiển thị
  colIndex: number // Cột logic để hiển thị (0-5)
}

interface CustomButtonProps {
  children: React.ReactNode
  onClick: () => void
  type?: 'primary' | 'default'
  className?: string
}

interface CustomTagProps {
  children: React.ReactNode
  // color?: string; // Đã bỏ đi để phù hợp với định nghĩa CustomTag hiện tại của bạn
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, onClick, type = 'primary', className = '' }) => {
  let buttonClasses =
    'px-6 py-3 rounded-full text-white font-bold transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105'
  if (type === 'primary') {
    buttonClasses += ' bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
  } else if (type === 'default') {
    buttonClasses += ' bg-gray-200 text-gray-800 hover:bg-gray-300'
  }
  return (
    <button className={`${buttonClasses} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

const CustomTag: React.FC<CustomTagProps> = ({ children }) => {
  const tagClasses = 'bg-green-100 text-green-800 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium'

  return <span className={tagClasses}>{children}</span>
}

const SeatChoosing = ({ openNotification, flightDetails, selectedSeats, setSelectedSeats }: IProp) => {
  const [seats, setSeats] = useState<Array<Array<Seat | null>>>([])
  // selectedSeats giờ sẽ là mảng các object { id: UUID của ticket, seatNumber: số ghế hiển thị }

  const [message, setMessage] = useState<string>('')

  const bookingFlight = useAppSelector((state) => state.bookingFlight.queryConfig)
  const passengerNumber = bookingFlight?.passengerNumber || 1

  const stringFilter = `flight.id:'${flightDetails?.id}' and seat.id:'${flightDetails.selectedSeat.seatId}'`

  const { data: fetchedTicketsData } = useGetAllTickets({
    page: 1,
    size: flightDetails.selectedSeat.quantity, // Giữ nguyên theo logic bạn cung cấp
    filter: stringFilter,
    sort: 'seatNumber,asc' // Đảm bảo dữ liệu được sắp xếp
  })

  const ticketNumbers: ITicketTable[] = useMemo(() => {
    return fetchedTicketsData?.data?.result || []
  }, [fetchedTicketsData])

  useEffect(() => {
    if (!ticketNumbers) return

    const seatsMap = new Map<number, ITicketTable>()
    ticketNumbers.forEach((ticket) => {
      if (typeof ticket.seatNumber === 'number') {
        seatsMap.set(ticket.seatNumber, ticket)
      }
    })

    const numSeatsPerRow = 6
    const totalSlotsPerRow = 7

    const maxSeatNumber = ticketNumbers.length > 0 ? (ticketNumbers[ticketNumbers.length - 1].seatNumber as number) : 0
    const numRows = maxSeatNumber > 0 ? Math.ceil(maxSeatNumber / numSeatsPerRow) : 1

    const finalSeatsData: Array<Array<Seat | null>> = []
    let currentSeatNumber = 1

    for (let r = 0; r < numRows; r++) {
      const rowData: (Seat | null)[] = []
      for (let c = 0; c < totalSlotsPerRow; c++) {
        if (c === 3) {
          rowData.push(null) // Aisle
        } else {
          if (currentSeatNumber <= maxSeatNumber) {
            const ticket = seatsMap.get(currentSeatNumber)
            let status

            if (ticket) {
              status = ticket.canBook === true ? 'available' : 'occupied'
            } else {
              status = 'occupied'
            }

            rowData.push({
              id: ticket?.id || `temp-${currentSeatNumber}`, // Sử dụng UUID của ticket làm id của Seat
              status: status,
              seatNumber: currentSeatNumber, // Số ghế tuần tự để hiển thị
              row: r + 1,
              colIndex: c > 3 ? c - 1 : c
            })
          } else {
            rowData.push(null) // Empty slot beyond maxSeatNumber
          }
          currentSeatNumber++
        }
      }
      finalSeatsData.push(rowData)
    }
    setSeats(finalSeatsData)
    setMessage('')
  }, [ticketNumbers, flightDetails?.id])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (openNotification) {
        if (selectedSeats.length !== Number(passengerNumber)) {
          openNotification(2)
        } else {
          openNotification()
        }
      }
    }, 0)

    return () => clearTimeout(timeout)
  }, [selectedSeats.length, passengerNumber, openNotification])

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') {
      setMessage(`Ghế số ${seat.seatNumber} đã có người. Vui lòng chọn ghế khác.`)
      return
    }

    setSeats((prevSeats) =>
      prevSeats.map((row) =>
        row.map((s) => {
          if (s && s.id === seat.id) {
            // So sánh bằng id (UUID của ticket)
            const newStatus = s.status === 'selected' ? 'available' : 'selected'

            setSelectedSeats((prev) => {
              const isAlreadySelected = prev.some((item) => item.id === s.id) // Kiểm tra bằng id
              let newSelected = [...prev]

              if (newStatus === 'selected') {
                if (!isAlreadySelected && newSelected.length < Number(passengerNumber)) {
                  newSelected.push({ id: s.id, seatNumber: s.seatNumber }) // Lưu object
                } else if (newSelected.length >= Number(passengerNumber)) {
                  setMessage(`Bạn chỉ có thể chọn tối đa ${passengerNumber} ghế.`)
                  return prev
                }
              } else {
                newSelected = newSelected.filter((item) => item.id !== s.id) // Lọc bằng id
              }
              setMessage('')
              // Sắp xếp theo seatNumber
              return newSelected.sort((a, b) => Number(a.seatNumber) - Number(b.seatNumber))
            })
            return { ...s, status: newStatus }
          }
          return s
        })
      )
    )
  }

  const renderSeat = (seat: Seat | null) => {
    if (!seat) {
      // Key cho div lối đi cần unique cho mỗi hàng để tránh warning trong React
      return (
        <div
          key={`aisle-spacer-${Math.random()}`}
          className='w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center'
        ></div>
      )
    }

    let seatClass =
      'w-10 h-12 sm:w-11 sm:h-14 rounded-2xl shadow-sm flex items-center justify-center text-xs font-semibold transform transition-transform duration-100 ease-in-out border border-gray-300 relative overflow-hidden'
    let tooltipText = `Ghế số ${seat.seatNumber}`
    let content: React.ReactNode = null

    // Kiểm tra ghế đã được chọn trong mảng selectedSeats (dựa vào id)
    const isSeatSelected = selectedSeats.some((item) => item.id === seat.id)

    if (seat.status === 'occupied') {
      seatClass += ' bg-gray-200 text-gray-600 cursor-not-allowed'
      tooltipText += ' (Đã có người)'
      content = <i className='fas fa-xmark text-gray-500 text-base z-10 relative'></i>
    } else if (isSeatSelected) {
      // Sử dụng isSeatSelected
      seatClass += ' bg-blue-400 text-white cursor-pointer hover:bg-blue-500 hover:scale-105'
      tooltipText += ' (Đang chọn)'
      content = <span className='z-10 relative'>{seat.seatNumber}</span>
    } else {
      seatClass += ' cursor-pointer hover:scale-105'
      tooltipText += ' (Có sẵn)'

      content = (
        <>
          <div
            className='absolute inset-0 bg-contain bg-no-repeat bg-center'
            style={{
              backgroundImage: `url(${'https://booking.vietnamairlines.com/statics/applications/booking/dist/11.0.60-vn-booking.2/free_seat.4db54b4c2f3c165f.svg'})`
            }}
          ></div>
          <div className='absolute inset-0 bg-blue-100 opacity-50'></div>
          <span className='z-10 relative text-gray-800'>{seat.seatNumber}</span>
        </>
      )
    }

    return (
      <div
        key={seat.id}
        className={`${seatClass} relative group`}
        onClick={() => handleSeatClick(seat)}
        title={tooltipText}
      >
        {content}
      </div>
    )
  }

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      setMessage('Vui lòng chọn ít nhất một ghế.')
      openNotification(2)
    } else if (selectedSeats.length !== Number(passengerNumber)) {
      setMessage(`Vui lòng chọn chính xác ${passengerNumber} ghế.`)
      openNotification(2)
    } else {
      // Khi confirm, log hoặc gửi mảng các object selectedSeats
      console.log('Ghế đã chọn:', selectedSeats)
      // Hiển thị seatNumber khi join chuỗi
      setMessage(`Bạn đã chọn các ghế: ${selectedSeats.map((s) => s.seatNumber).join(', ')}. Cảm ơn!`)
      openNotification(1) // Gọi openNotification với giá trị 1 cho thành công
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center font-sans'>
      <div className='bg-white p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-4xl border-t-8 border-indigo-600'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center'>
          <i className='fas fa-plane-departure text-indigo-600 mr-3'></i>
          Chọn Chỗ Ngồi Của Bạn
        </h1>

        <div className='flex flex-wrap justify-center gap-4 mb-8 text-sm'>
          <div className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-md relative overflow-hidden'>
              <div
                className='absolute inset-0 bg-contain bg-no-repeat bg-center'
                style={{
                  backgroundImage: `url(${'https://booking.vietnamairlines.com/statics/applications/booking/dist/11.0.60-vn-booking.2/free_seat.4db54b4c2f3c165f.svg'})`
                }}
              ></div>
              <div className='absolute inset-0 bg-blue-100 opacity-50'></div>
            </span>
            <span>Ghế Tiêu chuẩn</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-md bg-blue-400'></span>
            <span>Đang chọn</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-md bg-gray-200 flex items-center justify-center'>
              <i className='fas fa-xmark text-gray-500 text-xs'></i>
            </span>
            <span>Đã có người</span>
          </div>
        </div>

        <div className='relative w-full flex flex-col items-center py-6'>
          <div className='text-gray-700 text-lg font-bold mb-8'>
            <i className='fas fa-arrow-up mr-2'></i>
            Phía trước máy bay
            <i className='fas fa-arrow-up ml-2'></i>
          </div>

          <div className='relative w-full max-w-2xl bg-gray-50 border border-gray-300 rounded-[30px] shadow-lg overflow-hidden py-8'>
            <div className='px-4 sm:px-8'>
              <div className='min-w-max flex flex-col items-center'>
                {(!fetchedTicketsData || ticketNumbers.length === 0) && (
                  <p className='text-center text-gray-600'>Đang tải ghế...</p>
                )}

                {seats.length > 0 && (
                  // Bỏ overflow-y-auto và custom-scrollbar nếu bạn muốn không có scrollbar
                  <div className='space-y-2 pr-2'>
                    {seats.map((row, rowIndex) => (
                      <div key={rowIndex} className='flex items-center gap-2 mb-2 justify-center'>
                        {/* Bỏ hiển thị số hàng bên trái nếu không muốn */}
                        {/* <span className='w-6 text-right text-gray-500 font-medium text-sm'>{row[0]?.row}</span> */}
                        <div className='flex space-x-2'>
                          {row.slice(0, 3).map((seat, seatIndex) => (
                            <React.Fragment key={seat?.id || `empty-${rowIndex}-${seatIndex}`}>
                              {renderSeat(seat)}
                            </React.Fragment>
                          ))}
                        </div>

                        <React.Fragment key={`aisle-${rowIndex}`}>{renderSeat(row[3])}</React.Fragment>
                        <div className='flex space-x-2'>
                          {row.slice(4, 7).map((seat, seatIndex) => (
                            <React.Fragment key={seat?.id || `empty-${rowIndex}-${seatIndex + 4}`}>
                              {renderSeat(seat)}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='text-gray-700 text-lg font-bold mt-8'>
            <i className='fas fa-arrow-down mr-2'></i>
            Phía sau máy bay
            <i className='fas fa-arrow-down ml-2'></i>
          </div>
        </div>

        <div className='mt-8 text-center'>
          {message && <div className='mb-4 text-red-600 font-semibold'>{message}</div>}

          <div className='mb-6'>
            <h2 className='text-xl font-bold text-gray-800 mb-3'>Ghế đã chọn:</h2>
            {selectedSeats.length > 0 ? (
              <div className='flex flex-wrap justify-center gap-3'>
                {selectedSeats.map(
                  (
                    item // Lặp qua các object trong selectedSeats
                  ) => (
                    // Đã bỏ color='selected_tag' vì CustomTag của bạn không nhận prop color
                    <CustomTag key={item.id}>{item.seatNumber}</CustomTag>
                  )
                )}
              </div>
            ) : (
              <p className='text-gray-600 italic'>Chưa có ghế nào được chọn.</p>
            )}
          </div>

          <CustomButton type='primary' onClick={handleConfirm} className='w-full sm:w-auto'>
            Xác nhận lựa chọn
            <i className='fas fa-check-circle ml-2'></i>
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default SeatChoosing
