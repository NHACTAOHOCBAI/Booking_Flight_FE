import { useAppSelector } from '@/redux/hooks'
import { TiPlaneOutline } from 'react-icons/ti'
import InterAirport from './interAirport'
import DesAirport from './desAirport'
import dayjs from 'dayjs'

const FlightSchedule = () => {
  const bookingFlight = useAppSelector((state) => state.bookingFlight)

  return (
    <div className='flex flex-col gap-4'>
      {/* Start row */}
      <div className='flex items-center'>
        <div className='w-1/2 text-sm text-gray-700 font-medium'>
          {dayjs(bookingFlight.departureTime).format('HH:mm DD/MM/YYYY')}
        </div>
        <div className='w-[8.33%] flex justify-center'>
          <TiPlaneOutline className='w-5 h-5 transform rotate-180 text-gray-600' />
        </div>
        <div className='w-1/2 text-sm font-semibold text-gray-800'>{bookingFlight.arrivalAirportName}</div>
      </div>

      {/* Inter airports (nối chuyến) */}
      {bookingFlight.listFlight_Airport?.map((value, index) => {
        const startTime =
          index === 0 ? bookingFlight.departureTime : bookingFlight.listFlight_Airport[index - 1].departureTime

        return (
          <InterAirport
            key={index}
            departureTime={value.departureTime}
            airportId={value.airportName as string}
            startTime={startTime}
            arrivalTime={value.arrivalTime}
            note={value.note}
          />
        )
      })}

      {/* Final destination */}
      <DesAirport
        airportId={bookingFlight.arrivalAirportId as string}
        startTime={
          bookingFlight.listFlight_Airport && bookingFlight.listFlight_Airport.length === 0
            ? bookingFlight.departureTime
            : bookingFlight.listFlight_Airport?.[bookingFlight.listFlight_Airport.length - 1].departureTime
        }
        arrivalTime={bookingFlight.arrivalTime}
        note='nothing'
      />
    </div>
  )
}

export default FlightSchedule
