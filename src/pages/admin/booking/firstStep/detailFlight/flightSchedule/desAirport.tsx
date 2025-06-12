import { useAirportGetById } from '@/hooks/useAirport'
import { getTimeDifference } from '@/utils/utils'
import dayjs from 'dayjs'
import { IoLocationOutline } from 'react-icons/io5'

interface IProp {
  airportId: string
  startTime: string
  arrivalTime: string
  note: string
}

const DesAirport = ({ airportId, startTime, arrivalTime }: IProp) => {
  const airportName = useAirportGetById(airportId).data?.data.airportName

  return (
    <div className='w-full space-y-4'>
      {/* Time difference row with dashed line */}
      <div className='flex items-center mb-2'>
        <div className='w-1/2 flex justify-center items-center'>
          <div className='text-lg font-semibold'>{getTimeDifference(startTime, arrivalTime)}</div>
        </div>
        <div className=' flex justify-center'>
          <div className='h-24 border-l-2 border-dashed border-black'></div>
        </div>
      </div>

      {/* Time and airport row */}
      <div className='flex items-center'>
        <div className='w-1/2'>
          <div className='text-sm font-medium text-gray-700'>
            {dayjs(arrivalTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')}
          </div>
        </div>
        <div className='w-[8.33%] flex justify-center'>
          <IoLocationOutline className='w-5 h-5 mt-1 text-gray-600' />
        </div>
        <div className='w-1/2'>
          <div className='text-sm font-semibold text-gray-800'>{airportName}</div>
        </div>
      </div>
    </div>
  )
}

export default DesAirport
