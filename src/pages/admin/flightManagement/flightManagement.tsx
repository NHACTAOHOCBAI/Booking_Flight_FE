import flightApi from '@/apis/apis/flight.api'
import Access from '@/components/access'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import { AppContext } from '@/context/app.context'
import { useGetAllAirports } from '@/hooks/useAirport'
import { useDeleteFlight } from '@/hooks/useFlight'
import { BookingState, setBookingFlight } from '@/redux/features/bookingFlight/bookingFlightSlice'
import { useAppDispatch } from '@/redux/hooks'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import dayjs from 'dayjs'
import { useContext, useMemo, useRef, useState } from 'react'
import { IoTicketOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import DetailFlight from './detailFlight'
import NewFlight from './newFlight'
import UpdateFlight from './updateFlight'
const FlightManagement = () => {
  //detail
  const initialSetup = {
    id: '',
    flightCode: '',
    planeId: '',
    planeName: '',
    flightStatus: 'AVAILABLE',
    departureAirportId: '',
    departureAirportName: '',
    arrivalAirportId: '',
    arrivalAirportName: '',
    departureTime: '',
    arrivalTime: '',
    originPrice: 0,
    listFlight_Airport: [],
    listFlight_Seat: []
  }
  const [detailFlight, setDetailFlight] = useState<IFlightTable>(initialSetup)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedFlight, setUpdatedFlight] = useState<IFlightTable>(initialSetup)
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
      onSuccess: async () => {
        await actionRef.current?.reload()
        messageApi.success("Delete flight successfully");
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
  const airportData = useGetAllAirports({})
  const airportOptions = useMemo(
    () =>
      airportData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.airportName,
          label: value.airportName
        }
      }),
    [airportData]
  )
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions

  const columns: ProColumns<IFlightTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Code',
      dataIndex: 'flightCode',
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
      title: 'Departure City',
      search: false,
      render: (_, record) => {
        return <div>{record.departureAirportName}</div>
      }
    },
    {
      title: 'Departure Airport',
      dataIndex: 'departureAirportName',
      hidden: true,
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: airportOptions
      }
    },
    {
      title: 'Arrival City',
      search: false,
      render: (_, record) => {
        return <div>{record.arrivalAirportName}</div>
      }
    },
    {
      title: 'Arrival Airport',
      dataIndex: 'arrivalAirportName',
      hidden: true,
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: airportOptions
      }
    },
    {
      title: 'Departure Time ',
      search: false,
      valueType: 'date',
      render: (_, record) => {
        return dayjs(record.departureTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
      }
    },
    {
      title: 'Arrival Time ',
      search: false,
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
      title: 'Flight status',
      dataIndex: 'flightStatus',
      valueType: 'select',
      fieldProps: {
        showSearch: true,
        options: ['SOLD_OUT', 'AVAILABLE', 'FLOWN']
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
          <Access permission={ALL_PERMISSIONS['FLIGHTS']['PUT_FLIGHTS']} hideChildren>
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
          <Access permission={ALL_PERMISSIONS['FLIGHTS']['DELETE_FLIGHTS']} hideChildren>
            <Popconfirm
              title='Delete the flight'
              description='Are you sure to delete this flight?'
              okText='Delete'
              onConfirm={() => handleDelete(record.id as string)}
              cancelText='Cancel'
            >
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
              const bookingState: BookingState = {
                departureFlightDetails: {
                  ...record,
                  selectedSeat: {
                    price: 0,
                    quantity: 0,
                    quantityAvailable: 0
                  }
                },
                returnFlightDetails: null,
                queryConfig: {},
                amountPayment: 0,
                ticketNumbers: []
              }

              dispatch(setBookingFlight(bookingState))
              navigate(`/booking/passenger`)
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
          {/* <Access permission={ALL_PERMISSIONS['FLIGHTS']['GET_FLIGHTS']}> */}
          <ProTable<IFlightTable>
            rowKey='id'
            search={{
              labelWidth: 'auto'
            }}
            request={async (params) => {
              setError(null)

              try {
                const filters: string[] = []

                if (params.flightCode) {
                  filters.push(`flightCode~'${params.flightCode.trim()}'`)
                }

                if (params.departureAirportName) {
                  filters.push(`departureAirport.airportName ~'${params.departureAirportName}'`)
                }

                if (params.arrivalAirportName) {
                  filters.push(`arrivalAirport.airportName ~'${params.arrivalAirportName}'`)
                }

                if (params.flightStatus) {
                  filters.push(`flightStatus:'${params.flightStatus}'`)
                }

                const filterString = filters.length > 0 ? filters.join(' and ') : undefined
                const response = await flightApi.getFlights({
                  page: params.current,
                  size: params.pageSize,
                  filter: filterString
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
              <Access permission={ALL_PERMISSIONS['FLIGHTS']['POST_FLIGHTS']} hideChildren>
                {/* <Access permission={permissions}> */}
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
          {/* </Access> */}
          <NewFlight refetchData={() => actionRef.current?.reload()} isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdateFlight
            refetchData={() => actionRef.current?.reload()}
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
