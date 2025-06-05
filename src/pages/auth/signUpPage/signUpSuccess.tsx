import { Link } from 'react-router-dom'

export default function SuccessRegisterPage() {
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans'>
      <div className='bg-white rounded-xl shadow-lg p-8 sm:p-10 lg:p-12 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105'>
        {/* Success Icon */}
        <div className='mb-6 flex justify-center'>
          <svg
            className='w-20 h-20 text-green-500 animate-bounce'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
        </div>

        {/* Success Message */}
        <h1 className='text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 leading-tight'>
          Registration Successful!
        </h1>
        <p className='text-base sm:text-lg text-gray-600 mb-8'>
          "Thanks for registering! We've sent you a confirmation email. Please check your inbox and follow the link to
          activate your account."
        </p>

        {/* Call to Action Button */}
        <Link
          to='/login'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300'
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}
