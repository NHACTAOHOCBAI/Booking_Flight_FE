import { MyProfileTicketRes } from '@/globalType/myProfile.type'
import { Descriptions, Drawer } from 'antd'
import { DescriptionsProps } from 'antd/lib'

interface IProps {
  detailTicket: MyProfileTicketRes
  setDetailTicket: (value: MyProfileTicketRes) => void
  isDetailOpen: boolean
  setIsDetailOpen: (open: boolean) => void
}
const DetailTicket = (props: IProps) => {
  const { detailTicket, isDetailOpen, setIsDetailOpen, setDetailTicket } = props
  const handleClose = () => {
    setIsDetailOpen(false)
    setDetailTicket({
      id: '',
      flight: {},
      seat: {},
      passengerName: '',
      passengerPhone: '',
      passengerIDCard: '',
      passengerEmail: '',
      urlImage: '',
      ticketStatus: '',
      haveBaggage: false,
      seatNumber: 0
    })
  }

  const SeatItems: DescriptionsProps['items'] = [
    {
      key: 'SeatClass',
      label: 'Seat Class',
      span: 4,
      children: detailTicket?.seat.seatName
    },
    {
      key: 'PassengerName',
      label: 'Passenger Name',
      span: 4,
      children: detailTicket?.passengerName
    },
    {
      key: 'PassengerIDCard',
      label: 'Passenger ID Card',
      span: 4,
      children: detailTicket?.passengerIDCard
    },
    {
      key: 'PassengerEmail',
      label: 'Passenger Email',
      span: 4,
      children: detailTicket?.passengerEmail
    },
    {
      key: 'PassengerPhone',
      label: 'Passenger Phone',
      span: 4,
      children: detailTicket?.passengerPhone
    },
    {
      key: 'SeatNumber',
      label: 'Seat Number',
      span: 4,
      children: detailTicket?.seat.seatNumber
    },
    {
      key: 'TicketPrice',
      label: 'Ticket Price',
      span: 4,
      children:
        ((detailTicket?.seat.price as number) * (detailTicket.flight.originPrice as number)).toLocaleString() || 0
    },
    {
      key: 'TicketStatus',
      label: 'Ticket Status',
      span: 4,
      children: detailTicket?.ticketStatus
    }
  ]

  return (
    <>
      <Drawer title='Seat Information' onClose={handleClose} open={isDetailOpen} size='large'>
        <Descriptions size='middle' column={4} title='Seat Info' bordered items={SeatItems} />
      </Drawer>
    </>
  )
}
export default DetailTicket
