import { Descriptions, Drawer } from 'antd'
import { DescriptionsProps } from 'antd/lib'

interface IProps {
  detailTicket: ITicketTable
  setDetailTicket: (value: ITicketTable) => void
  isDetailOpen: boolean
  setIsDetailOpen: (open: boolean) => void
}
const DetailTicket = (props: IProps) => {
  const { detailTicket, isDetailOpen, setIsDetailOpen, setDetailTicket } = props
  const handleClose = () => {
    setIsDetailOpen(false)
    setDetailTicket({
      id: '',
      flightId: '',
      flightName: '',
      seatId: '',
      seatName: '',
      passengerName: '',
      passengerPhone: '',
      passengerIDCard: '',
      passengerEmail: '',
      haveBaggage: false
    })
  }

  const SeatItems: DescriptionsProps['items'] = [
    {
      key: 'FlightID',
      label: 'Flight ID',
      span: 4,
      children: detailTicket?.flightId
    },
    {
      key: 'SeatID',
      label: 'Seat ID',
      span: 4,
      children: detailTicket?.seatId
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
