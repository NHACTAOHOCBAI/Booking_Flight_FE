import React from 'react'

const AboutUsPage: React.FC = () => {
  return (
    <div className='container mx-auto p-8 sm:p-12 lg:p-16'>
      {/* Hero Section */}
      <div className='text-center mb-16'>
        <h1 className='text-5xl font-bold text-red-500 mb-4 animate-fade-in-up'>More Than Just Flights</h1>
        <p className='text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-100'>
          At FlyTime, we don't just sell airline tickets; we create unforgettable experiences and connect you with the
          world.
        </p>
      </div>

      {/* Our Mission Section */}
      <div className='bg-red-50 p-10 rounded-lg shadow-lg mb-16 animate-fade-in-up delay-200'>
        <h2 className='text-4xl font-bold text-red-700 mb-6 text-center'>Our Mission</h2>
        <p className='text-lg text-gray-800 leading-relaxed text-center max-w-4xl mx-auto'>
          Our mission is to bring you the best flight options at competitive prices, with a simple, fast booking process
          and superior customer support. We constantly strive to turn your travel dreams into reality, from urgent
          business trips to dream vacations.
        </p>
      </div>

      {/* What Makes Us Different Section */}
      <div className='mb-16'>
        <h2 className='text-4xl font-bold text-gray-800 mb-10 text-center animate-fade-in-up delay-300'>
          What Makes Us Different?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          {/* Card 1: Best Prices & Diverse Options */}
          <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-400'>
            <div className='text-5xl text-red-500 mb-4 text-center'>✈️</div>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4 text-center'>Best Prices & Diverse Options</h3>
            <p className='text-md text-gray-700 leading-relaxed'>
              With an extensive network of partners including major and regional airlines, we are committed to bringing
              you countless flight options to suit every budget and schedule, along with exclusive deals.
            </p>
          </div>

          {/* Card 2: Easy Booking Experience */}
          <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-500'>
            <div className='text-5xl text-green-500 mb-4 text-center'>✨</div>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4 text-center'>Easy Booking Experience</h3>
            <p className='text-md text-gray-700 leading-relaxed'>
              Our user-friendly interface makes it easy to search, compare, and book flights in just a few clicks. Save
              time and effort so you can focus on planning your trip.
            </p>
          </div>

          {/* Card 3: 24/7 Support */}
          <div className='bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-600'>
            <div className='text-5xl text-purple-500 mb-4 text-center'>📞</div>
            <h3 className='text-2xl font-semibold text-gray-900 mb-4 text-center'>24/7 Customer Support</h3>
            <p className='text-md text-gray-700 leading-relaxed'>
              Our team of experts is always ready to listen and answer all your questions, from planning to completing
              your flight. Your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className='bg-gray-50 p-10 rounded-lg shadow-lg mb-16 animate-fade-in-up delay-700'>
        <h2 className='text-4xl font-bold text-gray-800 mb-6 text-center'>Our Core Values</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center'>
          <div className='flex flex-col items-center'>
            <div className='text-red-600 text-4xl mb-3'>🤝</div>
            <h4 className='text-xl font-semibold text-gray-900'>Trustworthiness</h4>
            <p className='text-md text-gray-700'>Transparent and reliable.</p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-green-600 text-4xl mb-3'>🚀</div>
            <h4 className='text-xl font-semibold text-gray-900'>Innovation</h4>
            <p className='text-md text-gray-700'>Always seeking better solutions.</p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-purple-600 text-4xl mb-3'>❤️</div>
            <h4 className='text-xl font-semibold text-gray-900'>Dedication</h4>
            <p className='text-md text-gray-700'>Putting customers first.</p>
          </div>
          <div className='flex flex-col items-center'>
            <div className='text-yellow-600 text-4xl mb-3'>🌍</div>
            <h4 className='text-xl font-semibold text-gray-900'>Connection</h4>
            <p className='text-md text-gray-700'>Bringing the world closer.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsPage
