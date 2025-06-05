const ThirdStep = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full p-8 bg-white rounded-lg shadow-md'>
      <div className='text-green-600 text-4xl font-bold mb-2'>Booking Confirmed!</div>
      <div className='w-2/5 text-center text-gray-700 text-base leading-relaxed'>
        A confirmation email has been sent to <span className='font-semibold'>[Customer Email]</span> with your e-ticket
        and booking details.
        <br />
        If you need any assistance, please contact our support team at{' '}
        <span className='font-semibold'>[Support Contact]</span>.
        <br />
        <span className='text-lg mt-2 inline-block'>Wishing you a pleasant journey! ✨</span>
      </div>
    </div>
  )
}

export default ThirdStep
