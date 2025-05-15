import { Drawer, Descriptions, DescriptionsProps } from 'antd'
interface Props {
  detailAirport: IAirportTable
  isDetailOpen: boolean
  setIsDetailOpen: (value: boolean) => void
}

export default function DetailAirport(props: Props) {
  const { detailAirport, isDetailOpen, setIsDetailOpen } = props

  const handleClose = () => {
    setIsDetailOpen(false)
  }
  const airportItems: DescriptionsProps['items'] = [
    {
      key: 'airportCode',
      label: 'airport Code',
      span: 4,
      children: detailAirport.airportCode
    },
    {
      key: 'airportName',
      label: 'airport Name',
      span: 4,
      children: detailAirport.airportName
    },
    {
      key: 'cityName',
      label: 'city Name',
      span: 4,
      children: detailAirport.cityName
    }
  ]
  return (
    <>
      <Drawer title='airport Information' onClose={handleClose} open={isDetailOpen} size='large'>
        <Descriptions size='middle' column={4} title='airport Info' bordered items={airportItems} />
      </Drawer>
    </>
  )
}
