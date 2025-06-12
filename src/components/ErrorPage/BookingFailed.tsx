import React from 'react'
import { useNavigate } from 'react-router-dom'

const BookingFailed: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8 sm:p-12 md:p-20 bg-gradient-to-br from-red-50 to-white rounded-lg shadow-xl max-w-2xl mx-auto animate-fade-in'>
      {/* Failure Icon */}
      <div className='text-red-600 text-6xl mb-6'>&#x2717;</div>

      {/* Main Heading */}
      <h1 className='text-4xl font-extrabold text-red-700 mb-4 tracking-tight text-center'>Booking Failed!</h1>

      {/* Subtitle/Brief Explanation */}
      <p className='text-xl text-gray-600 mb-8 text-center leading-relaxed'>
        We're sorry, we couldn't process your booking request at this time.
      </p>

      {/* Possible Reasons */}
      <div className='w-full text-center text-gray-800 text-lg leading-relaxed space-y-4'>
        <p>This could be due to several reasons:</p>
        <ul className='list-disc list-inside text-left mx-auto max-w-md'>
          <li>Incorrect payment information.</li>
          <li>Insufficient funds on your card.</li>
          <li>An interrupted network connection.</li>
          <li>Tickets may have sold out or prices changed during processing.</li>
        </ul>
        <p className='mt-6'>Please try again or contact support if you need assistance.</p>
      </div>

      {/* Action Buttons */}
      <div className='mt-8 flex flex-col sm:flex-row gap-4'>
        <button
          onClick={() => navigate('/')}
          className='px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105'
        >
          Try Booking Again
        </button>
        <button
          onClick={() => navigate('/about')}
          className='px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-300 transition duration-300 ease-in-out transform hover:scale-105'
        >
          Contact Support
        </button>
      </div>

      {/* Support Contact Info */}
      <p className='text-md text-gray-500 mt-8'>
        For immediate assistance, please call: <span className='font-semibold'>[Support Phone Number]</span>
      </p>
    </div>
  )
}

export default BookingFailed
