import { useAppSelector } from '@/redux/hooks'
import { SendOutlined, SwapOutlined } from '@ant-design/icons'
import Ticket from './ticket'
import { AppContext } from '@/context/app.context'
import { useContext } from 'react'

const SecondStep = () => {
  const bookingFlight = useAppSelector((state) => state.bookingFlight)

  return (
    <div className='flex flex-col justify-center items-center p-6 bg-white rounded-lg shadow-inner'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Review Your Booking</h2>

      <div className=' mb-6'>
        <h3 className='text-xl font-semibold text-gray-800 mb-3 flex justify-start items-center'>
          <SendOutlined className='mr-2 text-blue-500' /> Departure Flight:{' '}
          {bookingFlight.departureFlightDetails!.flightCode}
        </h3>
        <Ticket
          selectedSeats={bookingFlight.ticketNumbers.slice(0, Number(bookingFlight.queryConfig.passengerNumber))}
          FlightDetails={bookingFlight.departureFlightDetails!}
        />
      </div>

      {bookingFlight?.departureFlightDetails && bookingFlight?.returnFlightDetails && (
        <div className='flex items-center justify-center my-8 w-full max-w-md'></div>
      )}

      {bookingFlight?.departureFlightDetails && !bookingFlight?.returnFlightDetails && <div className='my-8'></div>}

      {bookingFlight?.returnFlightDetails && (
        <div className='mb-6'>
          {/* Added div to contain title/icon and Ticket */}
          <h3 className='text-xl font-semibold text-gray-800 mb-3 flex items-center'>
            <SwapOutlined className='mr-2 text-blue-500' /> Return Flight:
            {bookingFlight.returnFlightDetails.flightCode}
          </h3>
          <Ticket
            selectedSeats={bookingFlight.ticketNumbers.slice(
              Number(bookingFlight.queryConfig.passengerNumber),
              Number(bookingFlight.queryConfig.passengerNumber) * 2
            )}
            FlightDetails={bookingFlight.returnFlightDetails}
          />
        </div>
      )}

      <p className='mt-8 text-gray-600 text-center'>Please review all details carefully before proceeding.</p>
    </div>
  )
}

export default SecondStep
