import { Descriptions, Drawer } from 'antd'
import { DescriptionsProps } from 'antd/lib'

interface IProps {
  detailPlane: IPlaneTable
  setDetailPlane: (value: IPlaneTable) => void
  isDetailOpen: boolean
  setIsDetailOpen: (open: boolean) => void
}
const DetailPlane = (props: IProps) => {
  const { detailPlane, isDetailOpen, setIsDetailOpen, setDetailPlane } = props
  const handleClose = () => {
    setIsDetailOpen(false)
    setDetailPlane({
      id: '',
      airlineId: '',
      planeCode: '',
      planeName: ''
    })
  }

  const planeItems: DescriptionsProps['items'] = [
    {
      key: 'PlaneName',
      label: 'Plane Name',
      span: 4,
      children: detailPlane?.planeName
    },
    {
      key: 'PlaneCode',
      label: 'Plane Code',
      span: 4,
      children: detailPlane?.planeCode
    },
    {
      key: 'AirlineName',
      label: 'Airline Name',
      span: 4,
      children: detailPlane?.airlineName
    }
  ]

  return (
    <>
      <Drawer title='Plane Information' onClose={handleClose} open={isDetailOpen} size='large'>
        <Descriptions size='middle' column={4} title='Plane Info' bordered items={planeItems} />
      </Drawer>
    </>
  )
}
export default DetailPlane
