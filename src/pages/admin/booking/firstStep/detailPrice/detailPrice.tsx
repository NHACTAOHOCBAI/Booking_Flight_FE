import { useAppSelector } from '@/redux/hooks'
import { Card, Table } from 'antd'
import { TableProps } from 'antd/lib'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { ImPriceTags } from 'react-icons/im'

const DetailPrice = () => {
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)
  const bookingFlight = useAppSelector((state) => state.bookingFlight)
  const detailPriceColumns: TableProps<ISeat>['columns'] = [
    {
      title: 'Seat Class',
      dataIndex: 'seatName',
      key: 'seatName'
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (_, _record) => `x ${bookingFlight.queryConfig.passengerNumber}`
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, value) => (
        <div> {(value.price * Number(bookingFlight.queryConfig.passengerNumber)).toLocaleString('vi-VN')} VNĐ</div>
      )
    }
  ]
  // Bước 1: Nhóm số lượng vé theo `seatId`
  const seatCount: Record<string, number> = {}
  bookingTicketsList.forEach((ticket) => {
    seatCount[ticket.seatId as string] = (seatCount[ticket.seatId as string] || 0) + 1
  })

  // Bước 2: Chuyển dữ liệu sang danh sách chi tiết giá
  // const allSeat = useGetAllSeats({}).data
  const detailPriceData: ISeat[] = [
    {
      ...bookingFlight.departureFlightDetails!.selectedSeat,
      price:
        bookingFlight.departureFlightDetails!.originPrice * bookingFlight.departureFlightDetails!.selectedSeat.price
    },
    ...(bookingFlight.returnFlightDetails
      ? [
          {
            ...bookingFlight.returnFlightDetails.selectedSeat,
            price: bookingFlight.returnFlightDetails.originPrice * bookingFlight.returnFlightDetails.selectedSeat.price
          }
        ]
      : [])
  ]
  // if (allSeat?.data) {
  //   detailPriceData = allSeat.data.result
  //     .filter((seat) => seatCount[seat.id!]) // Lọc ghế có số lượng vé
  //     .map((seat, key) => ({
  //       key,
  //       seatName: seat.seatName as string,
  //       quantity: seatCount[seat.id!] as number,
  //       price: (seat.price! * bookingFlight.departureFlightDetails!.originPrice) / 100
  //     }))
  // }
  let totalAmount = 0

  detailPriceData.forEach((value) => {
    totalAmount += value.price
  })
  return (
    <Card
      title={
        <div>
          <ImPriceTags style={{ width: 20, height: 20, verticalAlign: 'middle' }} /> Detail price
        </div>
      }
      className='place-items-start'
      variant='borderless'
      style={{ width: '100%' }}
    >
      <Table<ISeat> size='small' columns={detailPriceColumns} dataSource={detailPriceData} pagination={false} />
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: 10 }}>
        <div style={{ fontWeight: 'bold' }}>
          <FaMoneyCheckAlt style={{ width: 20, height: 20, verticalAlign: 'middle', marginBottom: 4 }} /> Total Amount:
        </div>
        <div>{totalAmount.toLocaleString('vi-VN')} VNĐ</div>
      </div>
    </Card>
  )
}

export default DetailPrice
