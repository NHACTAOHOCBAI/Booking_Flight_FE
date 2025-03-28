import { Drawer, Descriptions, DescriptionsProps } from 'antd'
interface Props {
  detailAirline: IAirlineTable
  isDetailOpen: boolean
  setIsDetailOpen: (value: boolean) => void
}

export default function DetailAirline(props: Props) {
  const { detailAirline, isDetailOpen, setIsDetailOpen } = props

  const handleClose = () => {
    setIsDetailOpen(false)
  }
  const AirlineItems: DescriptionsProps['items'] = [
    {
      key: 'AirlineCode',
      label: 'Airline Code',
      span: 4,
      children: detailAirline?.airlineCode
    },
    {
      key: 'AirlineName',
      label: 'Airline Name',
      span: 4,
      children: detailAirline?.airlineName
    }
  ]
  return (
    <>
      <Drawer title='Airline Information' onClose={handleClose} open={isDetailOpen} size='large'>
        <Descriptions size='middle' column={4} title='Airline Info' bordered items={AirlineItems} />
      </Drawer>
    </>
  )
}
