import { seatData } from '@/globalType'
import { useAppSelector } from '@/redux/hooks'
import { toFLight } from '@/utils/convert'
import { Card, Table } from 'antd'
import { TableProps } from 'antd/lib'
import { FaMoneyCheckAlt } from 'react-icons/fa'
import { ImPriceTags } from 'react-icons/im'
interface IDetailPrice {
  seatName: string
  quantity: number
  price: number
}
const DetailPrice = () => {
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)
  const bookingFlight = useAppSelector((state) => state.bookingFlight)
  const detailPriceColumns: TableProps<IDetailPrice>['columns'] = [
    {
      title: '',
      dataIndex: 'seatName',
      key: 'seatName'
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (_, record) => `x ${record.quantity}`
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, value) => <div> {(value.price * value.quantity).toLocaleString('vi-VN')} VNĐ</div>
    }
  ]
  // Bước 1: Nhóm số lượng vé theo `seatId`
  const seatCount: Record<string, number> = {}
  bookingTicketsList.forEach((ticket) => {
    seatCount[ticket.seatId as string] = (seatCount[ticket.seatId as string] || 0) + 1
  })

  // Bước 2: Chuyển dữ liệu sang danh sách chi tiết giá
  const detailPriceData: IDetailPrice[] = seatData
    .filter((seat) => seatCount[seat.id!]) // Lọc ghế có số lượng vé
    .map((seat, key) => ({
      key,
      seatName: seat.seatName as string,
      quantity: seatCount[seat.id!] as number,
      price: (seat.price! * toFLight(bookingFlight.id as string).originPrice) / 100
    }))
  let totalAmount = 0
  detailPriceData.forEach((value) => {
    totalAmount += value.price * value.quantity
  })
  return (
    <Card
      title={
        <div>
          <ImPriceTags style={{ width: 20, height: 20, verticalAlign: 'middle' }} /> Detail price
        </div>
      }
      headStyle={{ textAlign: 'left' }}
      variant='borderless'
      style={{ width: '100%' }}
    >
      <Table<IDetailPrice> size='small' columns={detailPriceColumns} dataSource={detailPriceData} pagination={false} />
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
