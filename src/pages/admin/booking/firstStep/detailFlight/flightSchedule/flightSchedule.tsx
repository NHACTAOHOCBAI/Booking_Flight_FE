import { useAppSelector } from '@/redux/hooks'
import { TiPlaneOutline } from 'react-icons/ti'
import InterAirport from './interAirport'
import DesAirport from './desAirport'

const FlightSchedule = () => {
  const bookingFlight = useAppSelector((state) => state.bookingFlight)

  const flights = [bookingFlight.departureFlightDetails, bookingFlight.returnFlightDetails]

  return (
    <>
      {flights.map((flight, index) => {
        if (flight)
          return (
            <div key={index} className='flex flex-col gap-4'>
              {/* Start row */}
              <div className='flex items-center'>
                <div className='w-1/2 text-sm text-gray-700 font-medium'>{flight.departureTime}</div>
                <div className='w-[8.33%] flex justify-center'>
                  <TiPlaneOutline className='w-5 h-5 transform rotate-180 text-gray-600' />
                </div>
                <div className='w-1/2 text-sm font-semibold text-gray-800'>{flight.departureAirportName}</div>
              </div>

              {/* Inter airports (nối chuyến) */}
              {flight.listFlight_Airport?.map((value, index) => {
                const startTime =
                  index === 0 ? flight.departureTime : flight.listFlight_Airport[index - 1].departureTime

                return (
                  <InterAirport
                    key={index}
                    departureTime={value.departureTime}
                    airportId={value.airportId as string}
                    startTime={startTime}
                    arrivalTime={value.arrivalTime}
                    note={value.note}
                  />
                )
              })}

              {/* Final destination */}
              <DesAirport
                airportId={flight.arrivalAirportId as string}
                startTime={
                  flight.listFlight_Airport && flight.listFlight_Airport.length === 0
                    ? flight.departureTime
                    : flight.listFlight_Airport?.[flight.listFlight_Airport.length - 1].departureTime
                }
                arrivalTime={flight.arrivalTime}
                note='nothing'
              />
            </div>
          )
      })}
    </>
  )
}

export default FlightSchedule
