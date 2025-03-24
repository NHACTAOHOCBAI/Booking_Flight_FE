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
const FlightManagement = () => {
  //detail
  const [detailFlight, setDetailFlight] = useState<IFlightItem>({
    _id: '',
    planeId: '',
    planeName: '',
    departureId: '',
    departureName: '',
    arrivalId: '',
    arrivalName: '',
    departureTime: '',
    arrivalTime: '',
    price: 0,
    ticket: [],
    interAirport: []
  })
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedFlight, setUpdatedFlight] = useState<IUpdateFlightItem>({
    _id: '',
    planeId: '',
    departureId: '',
    arrivalId: '',
    departureTime: '01/01/2000 00:00:00',
    arrivalTime: '01/01/2000 00:00:00',
    price: 0,
    ticket: [],
    interAirport: []
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)
  //Table
  const navigate = useNavigate()
  const actionRef = useRef<ActionType>(null)
  const data: IFlightItem[] = [
    {
      _id: 'FL001',
      planeId: 'PL001',
      planeName: 'Boeing 747',
      departureId: 'SGN',
      departureName: 'Tan Son Nhat International Airport',
      arrivalId: 'HAN',
      arrivalName: 'Noi Bai International Airport',
      departureTime: '2025-04-10T08:00:00Z',
      arrivalTime: '2025-04-10T10:00:00Z',
      price: 150,
      ticket: [
        { type: { _id: 'S001', name: 'Economy', price: 150, description: 'Basic seat' }, quantity: 50 },
        {
          type: { _id: 'S002', name: 'Business', price: 300, description: 'Spacious seat with premium service' },
          quantity: 10
        }
      ],
      interAirport: [
        {
          _id: 'SGN',
          arrivalTime: '2025-04-10T08:00:00Z',
          departureTime: '2025-04-10T08:00:00Z'
        },
        {
          _id: 'HAN',
          arrivalTime: '2025-04-10T08:00:00Z',
          departureTime: '2025-04-10T08:00:00Z'
        }
      ]
    },
    {
      _id: 'FL002',
      planeId: 'PL002',
      planeName: 'Airbus A320',
      departureId: 'DAD',
      departureName: 'Da Nang International Airport',
      arrivalId: 'SGN',
      arrivalName: 'Tan Son Nhat International Airport',
      departureTime: '2025-04-12T14:00:00Z',
      arrivalTime: '2025-04-12T16:00:00Z',
      price: 120,
      ticket: [
        {
          type: { _id: 'S001', name: 'Economy', price: 120, description: 'Affordable and comfortable seat' },
          quantity: 60
        },
        {
          type: { _id: 'S003', name: 'First Class', price: 400, description: 'Luxury seat with premium service' },
          quantity: 5
        }
      ],
      interAirport: []
    },
    {
      _id: 'FL003',
      planeId: 'PL003',
      planeName: 'Boeing 777',
      departureId: 'HAN',
      departureName: 'Noi Bai International Airport',
      arrivalId: 'PQC',
      arrivalName: 'Phu Quoc International Airport',
      departureTime: '2025-04-15T10:00:00Z',
      arrivalTime: '2025-04-15T12:30:00Z',
      price: 180,
      ticket: [
        { type: { _id: 'S001', name: 'Economy', price: 180, description: 'Basic seat' }, quantity: 70 },
        {
          type: { _id: 'S002', name: 'Business', price: 350, description: 'Premium seat with extra legroom' },
          quantity: 8
        }
      ],
      interAirport: []
    },
    {
      _id: 'FL004',
      planeId: 'PL004',
      planeName: 'Boeing 737',
      departureId: 'CXR',
      departureName: 'Cam Ranh International Airport',
      arrivalId: 'DAD',
      arrivalName: 'Da Nang International Airport',
      departureTime: '2025-04-18T16:00:00Z',
      arrivalTime: '2025-04-18T17:30:00Z',
      price: 100,
      ticket: [
        { type: { _id: 'S001', name: 'Economy', price: 100, description: 'Comfortable economy seat' }, quantity: 80 },
        {
          type: { _id: 'S003', name: 'First Class', price: 450, description: 'Exclusive first-class experience' },
          quantity: 4
        }
      ],
      interAirport: []
    }
  ]

  const columns: ProColumns<IFlightItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'ID',
      search: false,
      render: (_, record) => (
        <a
          style={{ color: '#3498db' }}
          onClick={() => {
            setDetailFlight(record)
            setIsDetailOpen(true)
          }}
        >
          {record._id}
        </a>
      )
    },
    {
      title: 'Departure Airport',
      dataIndex: 'departureName'
    },
    {
      title: 'Arrival Airport',
      dataIndex: 'arrivalName'
    },
    {
      title: 'Departure Time ',
      dataIndex: 'departureTime'
    },
    {
      title: 'Available tickets',
      render: (_, record) => (
        <a style={{ color: '#3498db' }}>
          {record.ticket.reduce((total, value) => {
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
              const ticket = record.ticket.map((value) => {
                return {
                  ticketId: value.type._id,
                  quantity: value.quantity
                }
              })
              setUpdatedFlight({
                _id: record._id,
                planeId: record.planeId,
                departureId: record.departureId,
                arrivalId: record.arrivalId,
                departureTime: record.departureTime,
                arrivalTime: record.arrivalTime,
                price: record.price,
                ticket: ticket,
                interAirport: record.interAirport
              })
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
              navigate(`booking/${record._id}`)
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
      <ProTable<IFlightItem>
        search={{
          labelWidth: 'auto', // hoặc 120, 200, v.v.
          defaultCollapsed: false, // nếu muốn mở rộng sẵn form search
          span: 6 // chia số cột hiển thị trong form, tuỳ độ rộng
        }}
        bordered
        dataSource={data}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        headerTitle='Flight List'
        //Khi ProTable được render hoặc có sự thay đổi ở bộ lọc, tìm kiếm, phân trang, nó sẽ tự động gọi hàm request
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
