import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useContext, useMemo, useRef, useState } from 'react'
import NewFlight from './newFlight'
import UpdateFlight from './updateFlight'
import DetailFlight from './detailFlight'
import { useNavigate } from 'react-router-dom'
import { IoTicketOutline } from 'react-icons/io5'
import dayjs from 'dayjs'
import { useAppDispatch } from '@/redux/hooks'
import { setBookingFlight } from '@/redux/features/bookingFlight/bookingFlightSlice'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'
import { useDeleteFlight } from '@/hooks/useFlight'
import airportApi from '@/apis/airport.api'
import { useQuery } from '@tanstack/react-query'
import flightApi from '@/apis/flight.api'
import { AppContext } from '@/context/app.context'
import Access from '@/components/access'
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
    listFlight_Airport: [],
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
    listFlight_Airport: [],
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
  const airportData = useQuery({
    queryKey: ['airports'],
    queryFn: () => airportApi.getAirports({}),
    enabled: isNewOpen
  })
  const airportOptions = useMemo(
    () =>
      airportData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.airportName
        }
      }),
    [airportData]
  )
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions
  const permissions = {
    method: '',
    apiPath: '',
    model: ''
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
        return dayjs(record.departureTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
      }
    },
    {
      title: 'Arrival Time ',
      valueType: 'date',
      render: (_, record) => {
        console.log(record)
        return dayjs(record.arrivalTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
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
          {/* <Access permission={ALL_PERMISSIONS['ACCOUNTS']['UPDATE']} hideChildren> */}
          <Access permission={permissions} hideChildren>
            <EditOutlined
              style={{
                color: '#54a0ff'
              }}
              onClick={() => {
                setUpdatedFlight(record)
                setIsUpdateOpen(true)
              }}
            />
          </Access>
          <Access permission={permissions}>
            <Popconfirm
              title='Delete the flight'
              description='Are you sure to delete this flight?'
              okText='Delete'
              onConfirm={() => handleDelete(record.id as string)}
              cancelText='Cancel'
            >
              {/* <Access permission={ALL_PERMISSIONS['ACCOUNTS']['DELETE']} hideChildren> */}

              <DeleteOutlined
                style={{
                  color: '#ee5253'
                }}
              />
            </Popconfirm>
          </Access>
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
  const [error, setError] = useState<unknown>(null)
  return (
    <>
      {contextHolder}
      {error ? (
        <ErrorPage />
      ) : (
        <>
          {/* <Access permission={ALL_PERMISSIONS['ACCOUNTS']['GET_PAGINATE']}> */}
          <Access permission={permissions}>
            <ProTable<IFlightTable>
              rowKey='id'
              search={{
                labelWidth: 'auto'
              }}
              request={async (params) => {
                setError(null)

                try {
                  const response = await flightApi.getFlights({
                    page: params.current,
                    size: params.pageSize
                  })

                  return {
                    data: response.data?.result,
                    success: true,
                    total: response.data?.pagination.total
                  }
                } catch (err) {
                  console.error(err)
                  setError(err)

                  return {
                    data: [],
                    success: false,
                    total: 0
                  }
                }
              }}
              columns={columns}
              actionRef={actionRef}
              bordered
              cardBordered
              headerTitle='Flights List'
              toolBarRender={() => [
                // <Access permission={ALL_PERMISSIONS['ACCOUNTS']['ADD']}>
                <Access permission={permissions}>
                  <Button
                    key='button'
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => {
                      setIsNewOpen(true)
                    }}
                  >
                    New Flight
                  </Button>
                </Access>
              ]}
              pagination={{
                pageSizeOptions: [5, 10, 20],
                showSizeChanger: true,
                defaultCurrent: 1,
                defaultPageSize: 5
              }}
            />
          </Access>
          <NewFlight isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdateFlight
            setUpdatedFlight={setUpdatedFlight}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            updatedFlight={updatedFlight}
          />
          <DetailFlight
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
            detailFlight={detailFlight}
            setDetailFlight={setDetailFlight}
          />
        </>
      )}
    </>
  )
}
export default FlightManagement
