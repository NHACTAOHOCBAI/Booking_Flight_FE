import { AppContext } from '@/context/app.context'
import { useGetAllTickets } from '@/hooks/useTicket'
import { useAppSelector } from '@/redux/hooks'

import html2canvas from 'html2canvas'
import { useContext, useEffect, useRef } from 'react'

import { BsFillTicketPerforatedFill } from 'react-icons/bs'

interface Props {
  FlightDetails: IFlightTable & { selectedSeat: ISeat }
}

const Ticket = ({ FlightDetails }: Props) => {
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)
  const bookingFlight = useAppSelector((state) => state.bookingFlight)
  const { setUrlTicket } = useContext(AppContext)

  let departureCityName
  let arrivalCityName

  if (bookingFlight.departureFlightDetails?.id === FlightDetails.id) {
    departureCityName = bookingFlight.queryConfig['departureAirport.city.cityName']
    arrivalCityName = bookingFlight.queryConfig['arrivalAirport.city.cityName']
  } else {
    arrivalCityName = bookingFlight.queryConfig['departureAirport.city.cityName']
    departureCityName = bookingFlight.queryConfig['arrivalAirport.city.cityName']
  }

  const stringFilter = `flight.id:'${FlightDetails.id}' and seat.id:'${FlightDetails.selectedSeat.seatId}' `
  const seatNumbers = useGetAllTickets({
    page: 1,
    size: bookingFlight.queryConfig.passengerNumber
  }).data?.data.result

  const captureRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    console.log(captureRefs.current.length)
    const generateImageUrls = async () => {
      const urls: { ticketId: string; imageUrl: string }[] = []
      for (let i = 0; i < captureRefs.current.length; i++) {
        const el = captureRefs.current[i]
        if (el) {
          const canvas = await html2canvas(el)
          const dataUrl = canvas.toDataURL('image/png')
          const ticketId = seatNumbers ? (seatNumbers[i].id as string) : ''
          urls.push({ ticketId: ticketId, imageUrl: dataUrl })
        }
      }
      setUrlTicket((prev) => {
        const prevIds = new Set(prev.map((item) => item.ticketId))

        const uniqueNew = urls.filter((url) => !prevIds.has(url.ticketId))

        return [...prev, ...uniqueNew]
      })

      console.log('ticketImageUrls:', urls)
    }

    if (bookingTicketsList.length > 0 && seatNumbers?.length === bookingTicketsList.length) {
      generateImageUrls()
    }
  }, [bookingTicketsList, seatNumbers])

  if (!FlightDetails) return null
  console.log(seatNumbers)
  if (seatNumbers)
    return (
      <div className='flex flex-col gap-2'>
        {bookingTicketsList.map((value, index) => (
          <div
            ref={(el) => {
              if (el) captureRefs.current[index] = el
            }}
            key={index}
            className='w-[950px] rounded-xl overflow-hidden shadow hover:shadow-md border'
          >
            <div className='bg-[#0984e3] h-[60px] flex justify-between items-end'>
              <div className='px-4 py-2 text-white font-bold text-lg'>AIRLINE NAME</div>
              <div className='px-4 pb-0 text-white font-bold text-lg flex items-center'>
                BOARDING PASS
                <BsFillTicketPerforatedFill className='w-10 h-10 ml-2 mb-1' />
              </div>
            </div>

            <div className='flex'>
              {/* Left Side */}
              <div className='w-[70%] m-4'>
                <div className='flex gap-4 mb-5'>
                  <div className='w-[40%] text-left'>
                    <div className='font-bold text-base mb-1'>Passenger Name :</div>
                    <div className='text-base'>{value.passengerName}</div>
                  </div>
                  <div className='w-[30%] text-left'>
                    <div className='font-bold text-base mb-1'>From :</div>
                    <div className='text-base'>{departureCityName}</div>
                  </div>
                  <div className='w-[30%] text-left'>
                    <div className='font-bold text-base mb-1'>To :</div>
                    <div className='text-base'>{arrivalCityName}</div>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='w-[40%] text-left'>
                    <div className='font-bold text-base mb-1'>Seat :</div>
                    <div className='text-base'>{seatNumbers![index].seatNumber}</div>
                  </div>
                  <div className='w-[30%] text-left'>
                    <div className='font-bold text-base mb-1'>Boarding Time :</div>
                    <div className='text-base'>{FlightDetails.departureTime}</div>
                  </div>
                  <div className='w-[30%] text-left'>
                    <div className='font-bold text-base mb-1'>Flight Code :</div>
                    <div className='text-base'>{FlightDetails.flightCode}</div>
                  </div>
                </div>
              </div>

              <div className='w-[2px] border-l-2 border-dashed border-[#0984e3]'></div>

              {/* Right Side */}
              <div className='w-[30%] items-start flex flex-col gap-2 m-4 text-sm'>
                <div>
                  <span className='font-bold'>Passenger Name:</span> {value.passengerName}
                </div>
                <div>
                  <span className='font-bold'>From:</span> {departureCityName}
                </div>
                <div>
                  <span className='font-bold'>To:</span> {arrivalCityName}
                </div>
                <div>
                  <span className='font-bold'>Seat Class:</span> {FlightDetails.selectedSeat.seatName}
                </div>
                <div>
                  <span className='font-bold'>Boarding Time:</span> {FlightDetails.departureTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
}

export default Ticket
