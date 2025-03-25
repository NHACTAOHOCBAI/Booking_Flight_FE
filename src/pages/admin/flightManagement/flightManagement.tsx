import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import NewFlight from './newFlight'
import UpdateFlight from './updateFlight'
import DetailFlight from './detailFlight'
import { useNavigate } from 'react-router-dom'
import { IoTicketOutline } from 'react-icons/io5'
import { flightData } from '@/globalType'
import dayjs from 'dayjs'
import { toAirport } from '@/utils/convert'
import { airportOptions } from '@/utils/select'
const FlightManagement = () => {
  //detail
  const [detailFlight, setDetailFlight] = useState<IFlightTable>({
    id: "",
    flightCode: "",
    planeId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureTime: "",
    arrivalTime: "",
    originPrice: 0,
    interAirport: [],
    seat: []
  })
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedFlight, setUpdatedFlight] = useState<IFlightTable>({
    id: "",
    flightCode: "",
    planeId: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureTime: "",
    arrivalTime: "",
    originPrice: 0,
    interAirport: [],
    seat: []
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)
  //Table
  const navigate = useNavigate()
  const actionRef = useRef<ActionType>(null)
  const data: IFlightTable[] = flightData
  const columns: ProColumns<IFlightTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Code',
      render: (_, record) => (
        <a
          style={{ color: '#3498db' }}
          onClick={() => {
            setDetailFlight(record)
            setIsDetailOpen(true)
          }}
        >
          {record.flightCode}
        </a>
      )
    },
    {
      title: 'Departure Airport',
      search: false,
      render: (_, record) => {
        return (<div>{toAirport(record.departureAirportId).airportName}</div>)
      },
    },
    {
      title: 'Departure Airport',
      hidden: true,
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: airportOptions, // Dữ liệu dropdown
      },
    },
    {
      title: 'Arrival Airport',
      search: false,
      render: (_, record) => {
        return (<div>{toAirport(record.arrivalAirportId).airportName}</div>)
      },
    },
    {
      title: 'Arrival Airport',
      hidden: true,
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: airportOptions, // Dữ liệu dropdown
      },
    },
    {
      title: 'Departure Time ',
      valueType: 'date',
      render: (_, record) => {
        return dayjs(record.departureTime).format('HH:mm DD/MM/YYYY')
      }
    },
    {
      title: 'Available tickets',
      search: false,
      render: (_, record) => (
        <a style={{ color: '#3498db' }}>
          {record.seat.reduce((total, value) => {
            return total + value.quantity
          }, 0)}
        </a>
      )
    },
    {
      title: 'Action',
      search: false,
      render: (_, record) => (
        <div
          style={{
            display: 'flex',
            gap: 10
          }}
        >
          <EditOutlined
            style={{
              color: '#54a0ff'
            }}
            onClick={() => {
              setIsUpdateOpen(true)
              setUpdatedFlight(record)
            }}
          />
          <Popconfirm
            title='Delete the airport'
            description='Are you sure to delete this airport?'
            okText='Delete'
            cancelText='Cancel'
          >
            <DeleteOutlined
              style={{
                color: '#ee5253'
              }}
            />
          </Popconfirm>
          <Button
            type='dashed'
            onClick={() => {
              navigate(`booking/${record.id}`)
            }}
          >
            <IoTicketOutline />
            Booking
          </Button>
        </div>
      )
    }
  ]
  return (
    <>
      <ProTable<IFlightTable>
        search={{
          labelWidth: 'auto',
        }}
        bordered
        dataSource={data}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        headerTitle='Flight List'
        toolBarRender={() => [
          <Button
            key='button'
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => {
              setIsNewOpen(true)
            }}
          >
            New Airport
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <NewFlight isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <UpdateFlight
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        updatedFlight={updatedFlight}
        setUpdatedFlight={setUpdatedFlight}
      />
      <DetailFlight
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        detailFlight={detailFlight}
        setDetailFlight={setDetailFlight}
      />
    </>
  )
}
export default FlightManagement
