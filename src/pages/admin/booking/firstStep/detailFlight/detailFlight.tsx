import { MdOutlineDoubleArrow } from 'react-icons/md'
import { PiAirplaneInFlightFill } from 'react-icons/pi'

import FlightSchedule from './flightSchedule/flightSchedule'
import { useAppSelector } from '@/redux/hooks'

const DetailFlight = () => {
  const bookingFlight = useAppSelector((state) => state.bookingFlight)
  const flights = [bookingFlight.departureFlightDetails, bookingFlight.returnFlightDetails]

  return (
    <div className='w-full border rounded-md shadow-sm p-4 bg-white'>
      {/* Card title */}
      <div className='text-lg font-semibold mb-4 flex items-center text-gray-800'>
        <PiAirplaneInFlightFill className='w-5 h-5 mr-2' />
        Detail flight
      </div>

      {flights.map((flight, index) => {
        if (flight)
          return (
            <div key={index}>
              <div className='flex items-start mb-2'>
                <div className='w-1/2 text-sm text-gray-700'>{flight.departureAirportName}</div>
                <div className='w-[8.33%] flex justify-center'>
                  <MdOutlineDoubleArrow className='w-5 h-5 mt-2 text-gray-500' />
                </div>
                <div className='w-1/2 text-sm text-gray-700'>{flight.arrivalAirportName}</div>
              </div>

              <div className='flex items-start mb-4'>
                <div className='w-1/2 text-sm text-gray-600'>{flight.departureTime}</div>
                <div className='w-[8.33%]'></div>
                <div className='w-1/2 text-sm text-gray-600'>{flight.arrivalTime}</div>
              </div>
            </div>
          )
      })}

      <div className='border-t border-gray-300 my-4'></div>

      <FlightSchedule />
    </div>
  )
}

export default DetailFlight
