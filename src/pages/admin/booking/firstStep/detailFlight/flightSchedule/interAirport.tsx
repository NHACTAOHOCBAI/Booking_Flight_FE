import { useAirportGetById } from '@/hooks/useAirport'
import dayjs from 'dayjs'
import { GrMapLocation } from 'react-icons/gr'

interface IProp {
  airportId: string
  startTime: string
  arrivalTime: string
  departureTime: string
  note: string
}

function getTimeDifference(arrivalTime: string, departureTime: string): string {
  const arrival = Date.parse(arrivalTime)
  const departure = Date.parse(departureTime)

  const diffMs = departure - arrival
  const totalMinutes = Math.floor(diffMs / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}h${minutes}m`
}

const InterAirport = ({ airportId, startTime, arrivalTime, departureTime }: IProp) => {
  const airportName = useAirportGetById(airportId).data?.data.airportName

  return (
    <div className='space-y-4'>
      {/* Thời gian dừng */}
      <div className='flex items-center mb-2'>
        <div className='w-1/2 flex justify-center items-center'>
          <div className='text-lg font-semibold text-gray-700'>{getTimeDifference(startTime, arrivalTime)}</div>
        </div>
        <div className='w-[8.33%] flex justify-center'>
          <div className='h-24 border-l-2 border-dashed border-black'></div>
        </div>
      </div>

      {/* Thông tin sân bay trung chuyển */}
      <div className='flex items-start'>
        <div className='w-1/2 text-center'>
          <div className='text-sm font-medium text-gray-700'>{dayjs(arrivalTime).format('HH:mm DD/MM/YYYY')}</div>
          <div className='h-4'></div>
          <div className='text-sm font-medium text-gray-700'>{dayjs(departureTime).format('HH:mm DD/MM/YYYY')}</div>
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
