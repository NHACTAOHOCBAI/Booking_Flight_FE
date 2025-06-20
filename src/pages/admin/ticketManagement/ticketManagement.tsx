import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { useContext, useRef, useState } from 'react'
import NewTicket from './newTicket'

import ticketApi from '@/apis/apis/ticket.api'
import Access from '@/components/access'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import { AppContext } from '@/context/app.context'
import { MyProfileTicketRes } from '@/globalType/myProfile.type'
import { TICKET_STATUSES_ENUM } from '@/globalType/ticket.type'
import DetailTicket from './detailTicket'
import UpdateTicket from './updateTicket'
import { Button, message, Popconfirm } from 'antd'
import { useCancelTicket } from '@/hooks/useBooking'
import { BookingState, setBookingFlight } from '@/redux/features/bookingFlight/bookingFlightSlice'
import { IoTicketOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

const TicketManagement = () => {
  //detail

  const navigate = useNavigate()

  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailTicket, setDetailTicket] = useState<MyProfileTicketRes>({
    id: '',
    flight: {},
    seat: {},
    passengerName: '',
    passengerPhone: '',
    passengerIDCard: '',
    passengerEmail: '',
    urlImage: '',
    ticketStatus: '',
    haveBaggage: false,
    seatNumber: 0
  })

  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedTicket, setUpdatedTicket] = useState<MyProfileTicketRes>({
    id: '',
    flight: {},
    seat: {},
    passengerName: '',
    passengerPhone: '',
    passengerIDCard: '',
    passengerEmail: '',
    urlImage: '',
    ticketStatus: '',
    haveBaggage: false,
    seatNumber: 0
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)

  // delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useCancelTicket()
  const handleDelete = (id: string) => {
    handleDeleteMutation.mutate([id], {
      onSuccess: async () => {
        await actionRef.current?.reload()
        messageApi.success('Cancel ticket successfully')
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

  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions

  //Table
  const actionRef = useRef<ActionType>(null)
  const columns: ProColumns<MyProfileTicketRes>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Seat Number',
      search: false,

      render: (_, record) => {
        console.log(record)
        return (
          <a
            style={{ color: '#3498db' }}
            onClick={() => {
              setDetailTicket(record)
              setIsDetailOpen(true)
            }}
          >
            {record.seatNumber}
          </a>
        )
      }
    },
    {
      title: 'Flight Code',

      render: (_, record) => <div>{record.flight ? record.flight.flightCode : 'null'}</div>
    },
    {
      title: 'Seat Name',
      search: false,
      dataIndex: 'seatName'
    },

    {
      title: 'Passenger Name',
      dataIndex: 'passengerName'
    },

    {
      title: 'Passenger Email',
      dataIndex: 'passengerEmail'
    },
    {
      title: 'Have Baggage',
      search: false,
      render: (_, record) => <div>{record.haveBaggage ? 'Yes' : 'No'}</div>
    },
    {
      title: 'Ticket Status',
      dataIndex: 'ticketStatus',
      valueType: 'select',
      valueEnum: TICKET_STATUSES_ENUM,
      render: (_, record) => {
        console.log(record)
        return <div>{record.ticketStatus}</div>
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
          <DownloadOutlined
            style={{ color: '#10ac84' }}
            onClick={() => {
              const link = document.createElement('a')
              link.href = record.urlImage
              link.download = 'ticket-image.jpg'
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
            }}
          />
          <Access permission={ALL_PERMISSIONS['TICKETS']['PUT_TICKETS']} hideChildren>
            {record.ticketStatus !== 'CANCELLED' ? (
              <EditOutlined
                style={{
                  color: '#54a0ff'
                }}
                onClick={() => {
                  setUpdatedTicket(record)
                  setIsUpdateOpen(true)
                }}
              />
            ) : (
              <div className='text-gray-400 cursor-not-allowed'>
                <EditOutlined />
              </div>
            )}
          </Access>

          <Access permission={ALL_PERMISSIONS['TICKETS']['DELETE_TICKETS']} hideChildren>
            {record.ticketStatus == 'BOOKED' ? (
              <Popconfirm
                title='Delete the airport'
                description='When you cancel, the ticket can be available again, do you want to cancel this ticket?'
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
            ) : (
              <div className='text-gray-400 cursor-not-allowed'></div>
            )}
          </Access>

          {record.ticketStatus == 'AVAILABLE' ? (
            <Button
              type='dashed'
              onClick={() => {
                console.log(record)
                navigate('/admin/manage-ticket/ticketAdmin', {
                  state: { record }
                })
              }}
            >
              <IoTicketOutline />
              Booking
            </Button>
          ) : (
            <div className='text-gray-400 cursor-not-allowed'></div>
          )}
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
          <Access permission={ALL_PERMISSIONS['TICKETS']['GET_TICKETS']}>
            <ProTable<MyProfileTicketRes>
              rowKey='id'
              search={{
                labelWidth: 'auto'
              }}
              request={async (params) => {
                setError(null)

                try {
                  const filters: string[] = []

                  if (params.flightCode) {
                    filters.push(`flight.flightCode:'${params.flightCode.trim()}'`)
                  }

                  if (params.passengerName) {
                    filters.push(`passengerName~'${params.passengerName.trim()}'`)
                  }
                  if (params.passengerEmail) {
                    filters.push(`account.email~'${params.passengerEmail.trim()}'`)
                  }
                  if (params.ticketStatus) filters.push(`ticketStatus:'${params.ticketStatus.trim()}'`)
                  const filterString = filters.length > 0 ? filters.join(' and ') : undefined

                  const response = await ticketApi.getTickets({
                    page: params.current,
                    size: params.pageSize,
                    filter: filterString
                  })
                  console.log(response)
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
              headerTitle='Tickets List'
              pagination={{
                pageSizeOptions: [5, 10, 20],
                showSizeChanger: true,
                defaultCurrent: 1,
                defaultPageSize: 5
              }}
            />
          </Access>
          <NewTicket
            refetchData={() => actionRef.current?.reload()}
            isNewOpen={isNewOpen}
            setIsNewOpen={setIsNewOpen}
          />
          <UpdateTicket
            refetchData={() => actionRef.current?.reload()}
            setUpdatedTicket={setUpdatedTicket}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            updatedTicket={updatedTicket}
          />
          <DetailTicket
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
            setDetailTicket={setDetailTicket}
            detailTicket={detailTicket}
          />
        </>
      )}
    </>
  )
}
export default TicketManagement
