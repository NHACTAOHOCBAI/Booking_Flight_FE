import { MyProfileTicketRes } from '@/globalType/myProfile.type'
import { onErrorUtil } from '@/globalType/util.type'
import { useCancelTicket } from '@/hooks/useBooking'
import { useGetMyPurchaseTicket } from '@/hooks/useMyProfile'
import { getTimeDifference } from '@/utils/utils'
import { Button, Card, Descriptions, Empty, message, Modal, Spin } from 'antd'
import React, { useState } from 'react'
interface TicketCardProps {
  ticket: MyProfileTicketRes
  showCancelButton: boolean
  onTicketCancelled?: () => void
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, showCancelButton, onTicketCancelled }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

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
  console.log(ticket)
  const duration = getTimeDifference(flightDetails.departureTime, flightDetails.arrivalTime)
  const cancelTicketMutation = useCancelTicket()
  const handleCancelTicket = async () => {
    Modal.confirm({
      title: 'Confirm Cancellation',
      content: 'Are you sure you want to cancel this ticket? This action cannot be undone.',
      okText: 'Yes, Cancel',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await cancelTicketMutation.mutateAsync([ticket.id])
          message.success('Ticket cancelled successfully!')
          setIsModalVisible(false)
          if (onTicketCancelled) {
            onTicketCancelled()
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error('Failed to cancel ticket:', error)
          const errorMessage = onErrorUtil(error)
          message.error(errorMessage.content || 'Failed to cancel ticket.')
        }
      }
    })
  }

  return (
    <Card className='border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4'>
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

      <div className='mt-4 text-right'>
        <Button onClick={showModal} type='link'>
          View Details
        </Button>
      </div>

      <Modal
        title={<span className='text-xl font-bold'>Ticket Details - {flightDetails.flightCode}</span>}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          showCancelButton && (
            <Button
              key='cancelTicket'
              type='primary'
              danger
              onClick={handleCancelTicket}
              //   loading={cancelTicketMutation.isPending}
            >
              Cancel Ticket
            </Button>
          ),
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
          <Descriptions.Item label='Original Price'>
            {(flightDetails.originPrice * ticket.seat.price).toLocaleString()} VND
          </Descriptions.Item>
          <Descriptions.Item label='Passenger Name'>{ticket.passengerName}</Descriptions.Item>
          <Descriptions.Item label='Passenger Phone'>{ticket.passengerPhone}</Descriptions.Item>
          <Descriptions.Item label='Passenger ID Card'>{ticket.passengerIDCard}</Descriptions.Item>
          <Descriptions.Item label='Passenger Email'>{ticket.passengerEmail}</Descriptions.Item>
          <Descriptions.Item label='Seat Name'>{ticket.seat.seatName}</Descriptions.Item>
          <Descriptions.Item label='Seat Number'>{ticket.seat.seatNumber}</Descriptions.Item>
          <Descriptions.Item label='Baggage'>{ticket.haveBaggage ? 'Yes' : 'No'}</Descriptions.Item>
          <Descriptions.Item label='Ticket Status'>{flightDetails.flightStatus}</Descriptions.Item>
          <Descriptions.Item label='Ticket Image'>
            <a href={ticket.urlImage} download='ticket-image.jpg' target='_blank' rel='noopener noreferrer'>
              Download image
            </a>
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </Card>
  )
}

interface TicketPurchasedPageProps {
  type: 'incoming' | 'flown' | 'cancelled'
}

const TicketPurchasedPage: React.FC<TicketPurchasedPageProps> = ({ type }) => {
  let pageTitle = ''
  let pageDescription = ''
  let filterTicket = ''

  switch (type) {
    case 'incoming':
      pageTitle = 'Incoming Flight Tickets'
      pageDescription = 'View details of your upcoming flight tickets.'

      filterTicket = `ticketStatus:'BOOKED'`
      break
    case 'flown':
      pageTitle = 'Flown Tickets'
      pageDescription = 'View details of your flights that have already taken off.'

      filterTicket = `ticketStatus:'USED'`
      break
    case 'cancelled':
      pageTitle = 'Cancelled Tickets'
      pageDescription = 'View details of your cancelled flight tickets.'

      filterTicket = `ticketStatus:'CANCELLED'`
      break
    default:
      pageTitle = 'Purchased Tickets'
      pageDescription = 'View details of all your purchased flight tickets.'
      filterTicket = `ticketStatus:'CANCELLED'`
      break
  }

  const { data: purchaseTicketGetData, isLoading, error, refetch } = useGetMyPurchaseTicket({ filter: filterTicket })
  const purchasedTickets = purchaseTicketGetData?.data.result
  console.log(purchasedTickets)
  return (
    <Card className='rounded-xl shadow-lg'>
      <div className='p-6'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-1'>{pageTitle}</h2>
        <p className='mt-1 text-sm text-gray-500 mb-6'>{pageDescription}</p>

        {isLoading && (
          <div className='text-center py-8'>
            <Spin size='large' />
            <p className='mt-4 text-gray-600'>Loading tickets...</p>
          </div>
        )}

        {error && (
          <div className='text-center py-8'>
            <p className='text-red-500'>Error loading tickets: {error.message}</p>
          </div>
        )}

        {!isLoading && !error && purchasedTickets && purchasedTickets.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {purchasedTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                showCancelButton={type === 'incoming'}
                onTicketCancelled={refetch}
              />
            ))}
          </div>
        ) : (
          !isLoading && !error && <Empty description={`No ${pageTitle.toLowerCase()} found.`} />
        )}
      </div>
    </Card>
  )
}

export default TicketPurchasedPage
