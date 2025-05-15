import { Drawer, Descriptions, DescriptionsProps } from 'antd'
interface Props {
  detailCity: ICityTable
  isDetailOpen: boolean
  setIsDetailOpen: (value: boolean) => void
}

export default function DetailCity(props: Props) {
  const { detailCity, isDetailOpen, setIsDetailOpen } = props

  const handleClose = () => {
    setIsDetailOpen(false)
  }
  const CityItems: DescriptionsProps['items'] = [
    {
      key: 'CityCode',
      label: 'City Code',
      span: 4,
      children: detailCity.cityCode
    },
    {
      key: 'CityName',
      label: 'City Name',
      span: 4,
      children: detailCity.cityName
    }
  ]
  return (
    <>
      <Drawer title='City Information' onClose={handleClose} open={isDetailOpen} size='large'>
        <Descriptions size='middle' column={4} title='City Info' bordered items={CityItems} />
      </Drawer>
    </>
  )
}
