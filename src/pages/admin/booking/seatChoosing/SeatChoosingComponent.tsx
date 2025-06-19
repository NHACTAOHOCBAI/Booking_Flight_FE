import React, { useState, useEffect, useMemo } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { useGetAllTickets } from '@/hooks/useTicket'

interface IProp {
  openNotification: (check?: number) => void
  flightDetails: IFlightTable & { selectedSeat: ISeat }
  selectedSeats: {
    ticketId: string
    seatNumber: number
  }[]
  setSelectedSeats: React.Dispatch<
    React.SetStateAction<
      {
        ticketId: string
        seatNumber: number
      }[]
    >
  >
}

interface Seat {
  id: string
  status: string
  seatNumber: number
  row: number
  colIndex: number
}

interface CustomButtonProps {
  children: React.ReactNode
  onClick: () => void
  type?: 'primary' | 'default'
  className?: string
}

interface CustomTagProps {
  children: React.ReactNode
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

const SeatChoosingComponent = ({ openNotification, flightDetails, selectedSeats, setSelectedSeats }: IProp) => {
  const [seats, setSeats] = useState<Array<Array<Seat | null>>>([])
  const [tempSelectedSeats, setTempSelectedSeats] = useState<Array<{ ticketId: string; seatNumber: number }>>([])

  const [message, setMessage] = useState<string>('')

  const bookingFlight = useAppSelector((state) => state.bookingFlight.queryConfig)
  const passengerNumber = bookingFlight?.passengerNumber || 1

  const stringFilter = `flight.id:'${flightDetails?.id}' and seat.id:'${flightDetails.selectedSeat.seatId}'`

  const { data: fetchedTicketsData } = useGetAllTickets({
    page: 1,
    size: flightDetails.selectedSeat.quantity,
    filter: stringFilter,
    sort: 'seatNumber,asc'
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
          rowData.push(null)
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
              id: ticket?.id || `temp-${currentSeatNumber}`,
              status: status,
              seatNumber: currentSeatNumber,
              row: r + 1,
              colIndex: c > 3 ? c - 1 : c
            })
          } else {
            rowData.push(null)
          }
          currentSeatNumber++
        }
      }
      finalSeatsData.push(rowData)
    }
    setSeats(finalSeatsData)
    setMessage('')
  }, [ticketNumbers, flightDetails?.id])

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') {
      setMessage(`Seat number ${seat.seatNumber} is occupied. Please choose another seat.`)
      return
    }

    setSeats((prevSeats) =>
      prevSeats.map((row) =>
        row.map((s) => {
          if (s && s.id === seat.id) {
            const newStatus = s.status === 'selected' ? 'available' : 'selected'

            setTempSelectedSeats((prev) => {
              const isAlreadySelected = prev.some((item) => item.ticketId === s.id)
              let newSelected = [...prev]

              if (newStatus === 'selected') {
                if (!isAlreadySelected && newSelected.length < Number(passengerNumber)) {
                  newSelected.push({ ticketId: s.id, seatNumber: s.seatNumber })
                } else if (newSelected.length >= Number(passengerNumber)) {
                  setMessage(`You can select a maximum of ${passengerNumber} seats.`)
                  return prev
                }
              } else {
                newSelected = newSelected.filter((item) => item.ticketId !== s.id)
              }
              setMessage('')

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
      return (
        <div
          key={`aisle-spacer-${Math.random()}`}
          className='w-10 h-12 sm:w-11 sm:h-14 flex items-center justify-center'
        ></div>
      )
    }

    let seatClass =
      'w-10 h-12 sm:w-11 sm:h-14 rounded-2xl shadow-sm flex items-center justify-center text-xs font-semibold transform transition-transform duration-100 ease-in-out border border-gray-300 relative overflow-hidden'
    let tooltipText = `Seat number ${seat.seatNumber}`
    let content: React.ReactNode = null

    const isSeatSelected = tempSelectedSeats.some((item) => item.ticketId === seat.id)

    if (seat.status === 'occupied') {
      seatClass += ' bg-gray-200 text-gray-600 cursor-not-allowed'
      tooltipText += ' (Occupied)'
      content = <i className='fas fa-xmark text-gray-500 text-base z-10 relative'></i>
    } else if (isSeatSelected) {
      seatClass += ' bg-blue-400 text-white cursor-pointer hover:bg-blue-500 hover:scale-105'
      tooltipText += ' (Selected)'
      content = <span className='z-10 relative'>{seat.seatNumber}</span>
    } else {
      seatClass += ' cursor-pointer hover:scale-105'
      tooltipText += ' (Available)'

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
    if (tempSelectedSeats.length === 0) {
      setMessage('Please select at least one seat.')
      openNotification?.(2)
    } else if (tempSelectedSeats.length !== Number(passengerNumber)) {
      setMessage(`Please select exactly ${passengerNumber} seats.`)
      openNotification?.(2)
    } else {
      setSelectedSeats(tempSelectedSeats)
      setMessage(`You have selected seats: ${tempSelectedSeats.map((s) => s.seatNumber).join(', ')}. Thank you!`)
      openNotification?.()
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 p-4 sm:p-8 flex items-center justify-center font-sans'>
      <div className='bg-white p-6 sm:p-10 rounded-xl shadow-2xl w-full max-w-4xl border-t-8 border-indigo-600'>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center'>
          <i className='fas fa-plane-departure text-indigo-600 mr-3'></i>
          Select Your Seat
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
            <span>Standard Seat</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-md bg-blue-400'></span>
            <span>Selected</span>
          </div>
          <div className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-md bg-gray-200 flex items-center justify-center'>
              <i className='fas fa-xmark text-gray-500 text-xs'></i>
            </span>
            <span>Occupied</span>
          </div>
        </div>

        <div className='relative w-full flex flex-col items-center py-6'>
          <div className='text-gray-700 text-lg font-bold mb-8'>
            <i className='fas fa-arrow-up mr-2'></i>
            Front of the plane
            <i className='fas fa-arrow-up ml-2'></i>
          </div>

          <div className='relative w-full max-w-2xl bg-gray-50 border border-gray-300 rounded-[30px] shadow-lg overflow-hidden py-8'>
            <div className='px-4 sm:px-8'>
              <div className='min-w-max flex flex-col items-center'>
                {(!fetchedTicketsData || ticketNumbers.length === 0) && (
                  <p className='text-center text-gray-600'>Loading seats...</p>
                )}

                {seats.length > 0 && (
                  <div className='space-y-2 pr-2'>
                    {seats.map((row, rowIndex) => (
                      <div key={rowIndex} className='flex items-center gap-2 mb-2 justify-center'>
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
            Back of the plane
            <i className='fas fa-arrow-down ml-2'></i>
          </div>
        </div>

        <div className='mt-8 text-center'>
          {message && <div className='mb-4 text-red-600 font-semibold'>{message}</div>}

          <div className='mb-6'>
            <h2 className='text-xl font-bold text-gray-800 mb-3'>Selected Seats:</h2>
            {tempSelectedSeats.length > 0 ? (
              <div className='flex flex-wrap justify-center gap-3'>
                {tempSelectedSeats.map((item) => (
                  <CustomTag key={item.ticketId}>{item.seatNumber}</CustomTag>
                ))}
              </div>
            ) : (
              <p className='text-gray-600 italic'>No seats selected yet.</p>
            )}
          </div>

          <CustomButton type='primary' onClick={handleConfirm} className='w-full sm:w-auto'>
            Confirm Selection
            <i className='fas fa-check-circle ml-2'></i>
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default SeatChoosingComponent
