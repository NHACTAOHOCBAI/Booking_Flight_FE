export default function Loading() {
  return (
    <section className='min-h-screen flex items-center justify-center'>
      <div
        className='w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin'
        role='status'
        aria-label='Loading'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </section>
  )
}
