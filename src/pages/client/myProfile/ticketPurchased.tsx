import React, { useState } from 'react'
import { Card, Button } from 'antd'

function TicketPurchasedPage() {
  const [purchasedTickets, setPurchasedTickets] = useState<
    Omit<IFlightTable, 'listFlight_Airport' | 'listFlight_Seat'>[]
  >([
    {
      id: 'FLT001',
      flightCode: 'VN123',
      departureTime: '10:00',
      arrivalTime: '12:00',
      originPrice: 1500000,
      planeId: 'PLN001',
      planeName: 'Boeing 787',
      departureAirportId: 'SGN',
      departureAirportName: 'Tân Sơn Nhất (SGN)',
      arrivalAirportId: 'HAN',
      arrivalAirportName: 'Nội Bài (HAN)'
    },
    {
      id: 'FLT002',
      flightCode: 'VJ456',
      departureTime: '14:30',
      arrivalTime: '16:00',
      originPrice: 1200000,
      planeId: 'PLN002',
      planeName: 'Airbus A320',
      departureAirportId: 'DAD',
      departureAirportName: 'Đà Nẵng (DAD)',
      arrivalAirportId: 'SGN',
      arrivalAirportName: 'Tân Sơn Nhất (SGN)'
    },
    {
      id: 'FLT003',
      flightCode: 'QH789',
      departureTime: '08:45',
      arrivalTime: '10:30',
      originPrice: 1800000,
      planeId: 'PLN003',
      planeName: 'Embraer 190',
      departureAirportId: 'HAN',
      departureAirportName: 'Nội Bài (HAN)',
      arrivalAirportId: 'PQC',
      arrivalAirportName: 'Phú Quốc (PQC)'
    }
  ])
  return (
    <Card className='rounded-xl shadow-lg'>
      <div className='p-6'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-1'>Purchased Flights</h2>
        <p className='mt-1 text-sm text-gray-500 mb-6'>View details of your purchased flight tickets.</p>
        {purchasedTickets.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {purchasedTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <p className='text-gray-500 text-center'>You have no purchased flight tickets.</p>
        )}
      </div>
    </Card>
  )
}

interface TicketCardProps {
  ticket: Omit<IFlightTable, 'listFlight_Airport' | 'listFlight_Seat'>
}
const calculateFlightDuration = (departureTime: string, arrivalTime: string): string => {
  const [depHour, depMinute] = departureTime.split(':').map(Number)
  const [arrHour, arrMinute] = arrivalTime.split(':').map(Number)

  const departureInMinutes = depHour * 60 + depMinute
  let arrivalInMinutes = arrHour * 60 + arrMinute

  if (arrivalInMinutes < departureInMinutes) {
    arrivalInMinutes += 24 * 60
  }

  const durationInMinutes = arrivalInMinutes - departureInMinutes
  const hours = Math.floor(durationInMinutes / 60)
  const minutes = durationInMinutes % 60

  return `${hours}h ${minutes}m`
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <Card className='border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200'>
      <h3 className='text-lg font-semibold text-gray-800 mb-2'>Flight {ticket.flightCode}</h3>

      {showDetails && (
        <div className='space-y-1 mt-2'>
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>From:</span> {ticket.departureAirportName}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>To:</span> {ticket.arrivalAirportName}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>Date:</span> {ticket.departureTime}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>Time:</span>{' '}
            {calculateFlightDuration(ticket.arrivalTime, ticket.departureTime)}
          </p>
          <p className='text-sm text-gray-600'>
            <span className='font-medium'>Status:</span>
            <span className='font-semibold text-green-600'>done</span>
          </p>
        </div>
      )}
      <div className='mt-4 text-right'>
        <Button onClick={toggleDetails} type='link'>
          {showDetails ? 'Hide Details' : 'View Details'}
        </Button>
      </div>
    </Card>
  )
}

export default TicketPurchasedPage
