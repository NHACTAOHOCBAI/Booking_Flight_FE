import React, { useState } from 'react'
import { Card, Button, Descriptions, Modal } from 'antd'
import { MyProfileTicketRes } from '@/globalType/myProfile.type'
import { useGetMyPurchaseTicket } from '@/hooks/useMyProfile'

// Helper function to calculate flight duration
const calculateFlightDuration = (departureTime: string, arrivalTime: string): string => {
  const [depHour, depMinute] = departureTime.split(':').map(Number)
  const [arrHour, arrMinute] = arrivalTime.split(':').map(Number)

  const departureInMinutes = depHour * 60 + depMinute
  let arrivalInMinutes = arrHour * 60 + arrMinute

  // Handle overnight flights (arrival time is on the next day)
  if (arrivalInMinutes < departureInMinutes) {
    arrivalInMinutes += 24 * 60 // Add 24 hours in minutes
  }

  const durationInMinutes = arrivalInMinutes - departureInMinutes
  const hours = Math.floor(durationInMinutes / 60)
  const minutes = durationInMinutes % 60

  return `${hours}h ${minutes}m`
}

// Props for TicketCard component
interface TicketCardProps {
  ticket: MyProfileTicketRes // Now directly using MyProfileTicketRes
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const [isModalVisible, setIsModalVisible] = useState(false) // State to control modal visibility

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const flightDetails = ticket.flight
  const duration = calculateFlightDuration(flightDetails.departureTime, flightDetails.arrivalTime)

  return (
    <Card className='border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4'>
      {/* Always visible information */}
      <h3 className='text-lg font-semibold text-gray-800 mb-2'>Flight {flightDetails.flightCode}</h3>
      <div className='space-y-1 text-gray-700'>
        <p className='text-sm'>
          <span className='font-medium'>From:</span> {flightDetails.departureAirport.airportName}
        </p>
        <p className='text-sm'>
          <span className='font-medium'>To:</span> {flightDetails.arrivalAirport.airportName}
        </p>
        <p className='text-sm'>
          <span className='font-medium'>Departure Time:</span> {flightDetails.departureTime}
        </p>
      </div>
      {/* Details shown only when expanded */}
      <div className='mt-4 text-right'>
        <Button onClick={showModal} type='link'>
          View Details
        </Button>
      </div>

      {/* Modal for detailed information */}
      <Modal
        title={<span className='text-xl font-bold'>Ticket Details - {flightDetails.flightCode}</span>}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Close
          </Button>
        ]}
      >
        <Descriptions bordered column={1} size='small' className='mt-4'>
          <Descriptions.Item label='Flight Code'>{flightDetails.flightCode}</Descriptions.Item>
          <Descriptions.Item label='Airline'>{flightDetails.plane.airline.airlineName}</Descriptions.Item>
          <Descriptions.Item label='Plane'>
            {flightDetails.plane.planeName} ({flightDetails.plane.planeCode})
          </Descriptions.Item>
          <Descriptions.Item label='Departure Airport'>{flightDetails.departureAirport.airportName}</Descriptions.Item>
          <Descriptions.Item label='Arrival Airport'>{flightDetails.arrivalAirport.airportName}</Descriptions.Item>
          <Descriptions.Item label='Departure Time'>{flightDetails.departureTime}</Descriptions.Item>
          <Descriptions.Item label='Arrival Time'>{flightDetails.arrivalTime}</Descriptions.Item>
          <Descriptions.Item label='Duration'>{duration}</Descriptions.Item>
          <Descriptions.Item label='Original Price'>{flightDetails.originPrice.toLocaleString()} VND</Descriptions.Item>
          <Descriptions.Item label='Passenger Name'>{ticket.passengerName}</Descriptions.Item>
          <Descriptions.Item label='Passenger Phone'>{ticket.passengerPhone}</Descriptions.Item>
          <Descriptions.Item label='Passenger ID Card'>{ticket.passengerIDCard}</Descriptions.Item>
          <Descriptions.Item label='Passenger Email'>{ticket.passengerEmail}</Descriptions.Item>
          <Descriptions.Item label='Seat Name'>{ticket.seatName}</Descriptions.Item>
          <Descriptions.Item label='Baggage'>{ticket.haveBaggage ? 'Yes' : 'No'}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </Card>
  )
}

function TicketPurchasedPage() {
  // const [purchasedTickets, setPurchasedTickets] = useState<MyProfileTicketRes[]>([
  //   {
  //     id: 'TKT001',
  //     seatId: 'S001',
  //     seatName: '12A',
  //     passengerName: 'Nguyen Van A',
  //     passengerPhone: '0912345678',
  //     passengerIDCard: '123456789',
  //     passengerEmail: 'vana@example.com',
  //     haveBaggage: true,
  //     flight: {
  //       id: 'FLT001',
  //       flightCode: 'VN123',
  //       plane: {
  //         id: 'P001',
  //         planeCode: 'B787',
  //         planeName: 'Boeing 787',
  //         airline: { id: 'AL001', airlineCode: 'VN', airlineName: 'Vietnam Airlines' }
  //       },
  //       departureAirport: {
  //         id: 'AP001',
  //         airportCode: 'SGN',
  //         airportName: 'Tan Son Nhat (SGN)',
  //         city: { id: 'C001', cityCode: 'HCM', cityName: 'Ho Chi Minh' }
  //       },
  //       arrivalAirport: {
  //         id: 'AP002',
  //         airportCode: 'HAN',
  //         airportName: 'Noi Bai (HAN)',
  //         city: { id: 'C002', cityCode: 'HN', cityName: 'Ha Noi' }
  //       },
  //       departureTime: '10:00',
  //       arrivalTime: '12:00',
  //       originPrice: 1500000
  //     }
  //   },
  //   {
  //     id: 'TKT002',
  //     seatId: 'S002',
  //     seatName: '05C',
  //     passengerName: 'Tran Thi B',
  //     passengerPhone: '0987654321',
  //     passengerIDCard: '987654321',
  //     passengerEmail: 'thib@example.com',
  //     haveBaggage: false,
  //     flight: {
  //       id: 'FLT002',
  //       flightCode: 'VJ456',
  //       plane: {
  //         id: 'P002',
  //         planeCode: 'A320',
  //         planeName: 'Airbus A320',
  //         airline: { id: 'AL002', airlineCode: 'VJ', airlineName: 'VietJet Air' }
  //       },
  //       departureAirport: {
  //         id: 'AP003',
  //         airportCode: 'DAD',
  //         airportName: 'Da Nang (DAD)',
  //         city: { id: 'C003', cityCode: 'DN', cityName: 'Da Nang' }
  //       },
  //       arrivalAirport: {
  //         id: 'AP001',
  //         airportCode: 'SGN',
  //         airportName: 'Tan Son Nhat (SGN)',
  //         city: { id: 'C001', cityCode: 'HCM', cityName: 'Ho Chi Minh' }
  //       },
  //       departureTime: '14:30',
  //       arrivalTime: '16:00',
  //       originPrice: 1200000
  //     }
  //   },
  //   {
  //     id: 'TKT003',
  //     seatId: 'S003',
  //     seatName: '21F',
  //     passengerName: 'Le Van C',
  //     passengerPhone: '0901234567',
  //     passengerIDCard: '456789123',
  //     passengerEmail: 'vanc@example.com',
  //     haveBaggage: true,
  //     flight: {
  //       id: 'FLT003',
  //       flightCode: 'QH789',
  //       plane: {
  //         id: 'P003',
  //         planeCode: 'E190',
  //         planeName: 'Embraer 190',
  //         airline: { id: 'AL003', airlineCode: 'QH', airlineName: 'Bamboo Airways' }
  //       },
  //       departureAirport: {
  //         id: 'AP002',
  //         airportCode: 'HAN',
  //         airportName: 'Noi Bai (HAN)',
  //         city: { id: 'C002', cityCode: 'HN', cityName: 'Ha Noi' }
  //       },
  //       arrivalAirport: {
  //         id: 'AP004',
  //         airportCode: 'PQC',
  //         airportName: 'Phu Quoc (PQC)',
  //         city: { id: 'C004', cityCode: 'PQ', cityName: 'Phu Quoc' }
  //       },
  //       departureTime: '08:45',
  //       arrivalTime: '10:30',
  //       originPrice: 1800000
  //     }
  //   }
  // ])
  const purchasedTickets = useGetMyPurchaseTicket({}).data?.data.result
  console.log(purchasedTickets)
  return (
    <Card className='rounded-xl shadow-lg'>
      <div className='p-6'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-1'>Purchased Flights</h2>
        <p className='mt-1 text-sm text-gray-500 mb-6'>View details of your purchased flight tickets.</p>
        {purchasedTickets && purchasedTickets.length > 0 ? (
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

export default TicketPurchasedPage
