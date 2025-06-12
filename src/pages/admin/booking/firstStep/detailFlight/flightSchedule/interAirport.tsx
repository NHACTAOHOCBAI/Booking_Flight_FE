import { useAirportGetById } from '@/hooks/useAirport'
import { getTimeDifference } from '@/utils/utils'
import dayjs from 'dayjs'
import { GrMapLocation } from 'react-icons/gr'

interface IProp {
  airportId: string
  startTime: string
  arrivalTime: string
  departureTime: string
  note: string
}

const InterAirport = ({ airportId, startTime, arrivalTime, departureTime }: IProp) => {
  const airportName = useAirportGetById(airportId).data?.data.airportName

  return (
    <div className='space-y-4'>
      <div className='flex items-center mb-2'>
        <div className='w-1/2 flex justify-center items-center'>
          <div className='text-lg font-semibold text-gray-700'>{getTimeDifference(startTime, arrivalTime)}</div>
        </div>
        <div className='w-[8.33%] flex justify-center'>
          <div className='h-24 border-l-2 border-dashed border-black'></div>
        </div>
      </div>

      <div className='flex items-start'>
        <div className='w-1/2 text-center'>
          <div className='text-sm font-medium text-gray-700'>
            {dayjs(arrivalTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')}
          </div>
          <div className='h-4'></div>
          <div className='text-sm font-medium text-gray-700'>{departureTime}</div>
        </div>
        <div className='w-[8.33%] flex justify-center'>
          <GrMapLocation className='w-5 h-5 mt-5 text-gray-600' />
        </div>
        <div className='w-1/2 text-sm font-semibold text-gray-800'>{airportName}</div>
      </div>
    </div>
  )
}

export default InterAirport
