import { useNavigate } from 'react-router-dom'

const ThirdStep = () => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen flex flex-col items-center justify-center p-8 sm:p-12 md:p-20 bg-gradient-to-br from-green-50 to-white rounded-lg shadow-xl max-w-2xl mx-auto  '>
      {/* Main Confirmation Message */}
      <h1 className='text-5xl font-extrabold text-green-700 mb-4 tracking-tight text-center'>Booking Confirmed!</h1>

      <p className='text-xl text-gray-600 mb-8 text-center leading-relaxed'>
        Your reservation is all set! We're excited to have you on board.
      </p>

      <div className='w-full text-center text-gray-800 text-lg leading-relaxed space-y-4'>
        <p>
          A detailed confirmation has been sent to your inbox at{' '}
          <span className='font-bold text-blue-600'>[Customer Email]</span>. Please check your email for your e-ticket
          and complete booking details.
        </p>
        <p>
          Need a hand? Our support team is here to help! Reach out to us at{' '}
          <span className='font-bold text-purple-600'>[Support Contact]</span> for any assistance.
        </p>
        <p className='text-2xl font-semibold mt-6 text-gray-700'>Wishing you a fantastic journey! ✨</p>
      </div>

      <div className='mt-8'>
        <button
          onClick={() => navigate('/')}
          className='px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105'
        >
          Continue Booking
        </button>
      </div>
    </div>
  )
}

export default ThirdStep
