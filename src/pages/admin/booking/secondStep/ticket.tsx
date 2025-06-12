import { useGetAllTickets } from '@/hooks/useTicket'
import { useAppSelector } from '@/redux/hooks'
import dayjs from 'dayjs'

import { BsFillTicketPerforatedFill } from 'react-icons/bs'

interface Props {
  FlightDetails: IFlightTable & { selectedSeat: ISeat }
  captureRef: React.RefObject<HTMLDivElement | null>
}

const Ticket = ({ FlightDetails, captureRef }: Props) => {
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)
  const bookingFlight = useAppSelector((state) => state.bookingFlight)

  const departureCityName = bookingFlight.queryConfig['departureAirport.city.cityName']
  const arrivalCityName = bookingFlight.queryConfig['arrivalAirport.city.cityName']

  const stringFilter = `flight.id:'${FlightDetails.id}' and seat.id:'${FlightDetails.selectedSeat.seatId}'`
  const seatNumbers = useGetAllTickets({
    page: 1,
    size: bookingFlight.queryConfig.passengerNumber,
    filter: stringFilter
  }).data?.data.result

  if (!FlightDetails) return null
  if (seatNumbers)
    return (
      <div className='flex flex-col gap-2'>
        {bookingTicketsList.map((value, index) => (
          <div
            ref={captureRef}
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
                    <div className='text-base'>{dayjs(FlightDetails.departureTime).format('HH:mm DD/MM/YYYY')}</div>
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
                  <span className='font-bold'>Boarding Time:</span>{' '}
                  {dayjs(FlightDetails.departureTime).format('HH:mm DD/MM/YYYY')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
}

export default Ticket
