import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import NewFlight from './newFlight'
import UpdateFlight from './updateFlight'
import DetailFlight from './detailFlight'
import { useNavigate } from 'react-router-dom'
import { IoTicketOutline } from 'react-icons/io5'
import dayjs from 'dayjs'
import { airportOptions } from '@/utils/select'
import { useAppDispatch } from '@/redux/hooks'
import { setBookingFlight } from '@/redux/features/bookingFlight/bookingFlightSlice'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'
import { useDeleteFlight, useGetAllFlights } from '@/hooks/useFlight'
const FlightManagement = () => {
  //detail
  const [detailFlight, setDetailFlight] = useState<IFlightTable>({
    id: '',
    flightCode: '',
    planeId: '',
    planeName: '',
    departureAirportId: '',
    departureAirportName: '',
    arrivalAirportId: '',
    arrivalAirportName: '',
    departureTime: '',
    arrivalTime: '',
    originPrice: 0,
    intermediateAirports: [],
    listFlight_Seat: []
  })
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedFlight, setUpdatedFlight] = useState<IFlightTable>({
    id: '',
    flightCode: '',
    planeId: '',
    planeName: '',
    departureAirportId: '',
    departureAirportName: '',
    arrivalAirportId: '',
    arrivalAirportName: '',
    departureTime: '',
    arrivalTime: '',
    originPrice: 0,
    intermediateAirports: [],
    listFlight_Seat: []
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)
  //Table
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const actionRef = useRef<ActionType>(null)

  // delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeleteFlight()
  const handleDelete = (id: string) => {
    handleDeleteMutation.mutate(id, {
      onSuccess(data) {
        messageApi.open({
          type: 'success',
          content: data.message
        })
      },
      onError(error) {
        console.log(error)
        messageApi.open({
          type: 'error',
          content: error.message
        })
      }
    })
  }
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
        return <div>{record.departureAirportName}</div>
      }
    },
    {
      title: 'Departure Airport',
      hidden: true,
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: airportOptions // Dữ liệu dropdown
      }
    },
    {
      title: 'Arrival Airport',
      search: false,
      render: (_, record) => {
        return <div>{record.arrivalAirportName}</div>
      }
    },
    {
      title: 'Arrival Airport',
      hidden: true,
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: airportOptions // Dữ liệu dropdown
      }
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
      render: (_, record) => {
        return (
          <div>
            {record.listFlight_Seat ? record.listFlight_Seat.reduce((total, value) => total + value.quantity, 0) : 0}
          </div>
        )
      }
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
            onConfirm={() => handleDelete(record.id as string)}
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
              dispatch(setBookingFlight(record))
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
  //fetch data
  const { isLoading, isError, error, data } = useGetAllFlights()
  if (isLoading) {
    return <LoadingError />
  }

  if (isError) {
    console.log(error)
    return <ErrorPage />
  }
  if (!data) return
  return (
    <>
      {contextHolder}
      <ProTable<IFlightTable>
        search={{
          labelWidth: 'auto'
        }}
        bordered
        dataSource={data.data}
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
