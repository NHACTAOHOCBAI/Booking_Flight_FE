import { Descriptions, Drawer, Table, TableProps } from 'antd'
import { DescriptionsProps } from 'antd/lib'
import dayjs from 'dayjs'

interface IProps {
  detailFlight: IFlightTable
  setDetailFlight: (value: IFlightTable) => void
  isDetailOpen: boolean
  setIsDetailOpen: (open: boolean) => void
}
const DetailFlight = (props: IProps) => {
  const { detailFlight, isDetailOpen, setIsDetailOpen, setDetailFlight } = props
  const handleClose = () => {
    setIsDetailOpen(false)
    setDetailFlight({
      id: '',
      flightCode: '',
      planeName: '',
      departureAirportId: '',
      departureAirportName: '',
      arrivalAirportId: '',
      arrivalAirportName: '',
      departureTime: '',
      arrivalTime: '',
      originPrice: 0,
      intermediateAirports: [],
      seat: []
    })
  }
  const Content = (value: string) => {
    return <div>{value}</div>
  }
  const flightItems: DescriptionsProps['items'] = [
    {
      key: 'flightCode',
      label: 'Flight Code',
      span: 4,
      children: detailFlight?.flightCode
    },
    {
      key: 'arrivalName',
      label: 'Arrival airport',
      span: 2,
      children: detailFlight.arrivalAirportName
    },
    {
      key: 'departureName',
      label: 'Departure airport',
      span: 2,
      children: detailFlight.departureAirportName
    },
    {
      key: 'departureTime',
      label: 'Departure time',
      span: 2,
      children: dayjs(detailFlight?.departureTime).format('HH:mm DD/MM/YYYY')
    },
    {
      key: 'arrivalTime',
      label: 'Arrival time',
      span: 2,
      children: dayjs(detailFlight?.arrivalTime).format('HH:mm DD/MM/YYYY')
    },
    {
      key: 'plane',
      label: 'Plane',
      span: 2,
      children: detailFlight.planeName
    },
    {
      key: 'initialPrice',
      label: 'Price',
      span: 2,
      children: `${detailFlight?.originPrice} VNĐ`
    }
  ]
  const interColumns: TableProps<IintermediateAirports>['columns'] = [
    {
      title: 'Intermediate airport',
      dataIndex: 'index',
      key: 'index',
      children: [
        {
          title: 'No.',
          dataIndex: 'index',
          key: 'index',
          render: (_, __, index) => index + 1
        },
        {
          title: 'Airport',
          dataIndex: '',
          key: 'airportName',
          render: (_, value) => value.airportName
        },
        {
          title: 'Arrival time',
          dataIndex: '',
          key: 'arrivalTime',
          render: (_, value) => dayjs(value.arrivalTime).format('HH:mm DD/MM/YYYY')
        },
        {
          title: 'Departure time',
          dataIndex: '',
          key: 'departureTime',
          render: (_, value) => dayjs(value.departureTime).format('HH:mm DD/MM/YYYY')
        },
        {
          title: 'Note',
          dataIndex: 'note'
        }
      ]
    }
  ]
  const seatColumns: TableProps<ISeat>['columns'] = [
    {
      title: 'Available tickets',
      dataIndex: 'index',
      key: 'index',
      children: [
        {
          title: 'No.',
          dataIndex: 'index',
          key: 'index',
          render: (_, __, index) => index + 1
        },
        {
          title: 'Seat',
          dataIndex: '',
          key: 'seatName',
          render: (_, value) => value.seatName
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity'
        },
        {
          title: 'Actual price',
          key: 'price',
          render: (_, value) => {
            return (detailFlight.originPrice * value.price) / 100
          }
        }
      ]
    }
  ]
  return (
    <>
      <Drawer title='Flight Information' onClose={handleClose} open={isDetailOpen} size='large'>
        <Descriptions size='middle' column={4} bordered items={flightItems} />
        {detailFlight.intermediateAirports && detailFlight.intermediateAirports.length !== 0 ? (
          <>
            <div style={{ height: 10 }}></div>
            <Table<IintermediateAirports>
              bordered
              size='small'
              columns={interColumns}
              dataSource={detailFlight.intermediateAirports}
              pagination={false}
            />
          </>
        ) : (
          <></>
        )}
        <div style={{ height: 10 }}></div>
        <Table<ISeat> bordered size='small' columns={seatColumns} dataSource={detailFlight.seat} pagination={false} />
      </Drawer>
    </>
  )
}
export default DetailFlight
