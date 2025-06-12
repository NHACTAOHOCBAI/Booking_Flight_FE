import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useContext, useRef, useState } from 'react'
import NewTicket from './newTicket'

import ticketApi from '@/apis/apis/ticket.api'
import Access from '@/components/access'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import { AppContext } from '@/context/app.context'
import { useDeleteTicket } from '@/hooks/useTicket'
import DetailTicket from './detailTicket'
import UpdateTicket from './updateTicket'

const TicketManagement = () => {
  //detail
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailTicket, setDetailTicket] = useState<ITicketTable>({
    id: '',
    flightCode: '',
    seatName: '',
    passengerName: '',
    passengerPhone: '',
    passengerIDCard: '',
    passengerEmail: '',
    haveBaggage: false
  })

  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedTicket, setUpdatedTicket] = useState<ITicketTable>({
    id: '',
    flightCode: '',
    seatName: '',
    passengerName: '',
    passengerPhone: '',
    passengerIDCard: '',
    passengerEmail: '',
    haveBaggage: false
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)

  // delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeleteTicket()
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
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions

  //Table
  const actionRef = useRef<ActionType>(null)
  const columns: ProColumns<ITicketTable>[] = [
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
            setDetailTicket(record)
            setIsDetailOpen(true)
          }}
        >
          {record.id}
        </a>
      )
    },
    {
      title: 'Flight Code',

      dataIndex: 'flightCode'
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
      title: 'Passenger Id Card',
      search: false,
      dataIndex: 'passengerIDCard'
    },
    {
      title: 'Passenger Phone',
      search: false,
      dataIndex: 'passengerPhone'
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
      title: 'Action',
      search: false,
      render: (_, record) => (
        <div
          style={{
            display: 'flex',
            gap: 10
          }}
        >
          <Access permission={ALL_PERMISSIONS['TICKETS']['PUT_TICKETS']} hideChildren>
            <EditOutlined
              style={{
                color: '#54a0ff'
              }}
              onClick={() => {
                setUpdatedTicket(record)
                setIsUpdateOpen(true)
              }}
            />
          </Access>
          <Access permission={ALL_PERMISSIONS['TICKETS']['DELETE_TICKETS']} hideChildren>
            <Popconfirm
              title='Delete the ticket'
              description='Are you sure to delete this ticket?'
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
            <ProTable<ITicketTable>
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

                  const filterString = filters.length > 0 ? filters.join(' and ') : undefined

                  const response = await ticketApi.getTickets({
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
              headerTitle='Tickets List'
              toolBarRender={() => [
                <Access permission={ALL_PERMISSIONS['TICKETS']['POST_TICKETS']} hideChildren>
                  <Button
                    key='button'
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => {
                      setIsNewOpen(true)
                    }}
                  >
                    New Ticket
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
          <NewTicket isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdateTicket
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
