import { Descriptions, Drawer } from 'antd'
import { DescriptionsProps } from 'antd/lib'

interface IProps {
  detailSeat: ISeatTable
  setDetailSeat: (value: ISeatTable) => void
  isDetailOpen: boolean
  setIsDetailOpen: (open: boolean) => void
}
const DetailSeat = (props: IProps) => {
  const { detailSeat, isDetailOpen, setIsDetailOpen, setDetailSeat } = props
  const handleClose = () => {
    setIsDetailOpen(false)
    setDetailSeat({
      id: '',
      seatCode: '',
      seatName: '',
      description: '',
      price: 0
    })
  }

  const SeatItems: DescriptionsProps['items'] = [
    {
      key: 'SeatName',
      label: 'Seat Name',
      span: 4,
      children: detailSeat?.seatName
    },
    {
      key: 'SeatCode',
      label: 'Seat Code',
      span: 4,
      children: detailSeat?.seatCode
    },
    {
      key: 'Price',
      label: 'Price',
      span: 4,
      children: <div>{detailSeat?.price}%</div>
    },
    {
      key: 'Description',
      label: 'Description',
      span: 4,
      children: detailSeat?.description
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
export default DetailSeat
