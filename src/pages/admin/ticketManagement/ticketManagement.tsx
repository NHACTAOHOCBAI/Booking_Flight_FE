import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import NewTicket from './newTicket'

import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'
import { useDeleteTicket } from '@/hooks/useTicket'
import DetailTicket from './detailTicket'
import UpdateTicket from './updateTicket'
import ticketApi from '@/apis/ticket.api'

const TicketManagement = () => {
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)

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
      dataIndex: 'seatName'
    },
    {
      title: 'Passenger Name',
      dataIndex: 'passengerName'
    },
    {
      title: 'Passenger Id Card',
      dataIndex: 'passengerIDCard'
    },
    {
      title: 'Passenger Phone',
      dataIndex: 'passengerPhone'
    },
    {
      title: 'Passenger Email',
      dataIndex: 'passengerEmail'
    },
    {
      title: 'Have Baggage',
      render: (_, record) => <div>{record.haveBaggage ? 'Yes' : 'No'}</div>
    },
    {
      title: 'Action',
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
              setUpdatedTicket(record)
              setIsUpdateOpen(true)
            }}
          />
          <Popconfirm
            title='Delete the ticket'
            description='Are you sure to delete this ticket?'
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
        </div>
      )
    }
  ]

  return (
    <>
      {contextHolder}
      {loading && <LoadingError />}
      {error && <ErrorPage />}
      <ProTable<ITicketTable>
        rowKey='id'
        search={{
          labelWidth: 'auto'
        }}
        request={async (params) => {
          setLoading(true)
          setError(null)

          try {
            const response = await ticketApi.getTickets({
              page: params.current,
              size: params.pageSize
            })

            setLoading(false)
            return {
              data: response.data?.result,
              success: true,
              total: response.data?.meta.total
            }
          } catch (err) {
            console.error(err)
            setError(err)
            setLoading(false)
            return {
              data: [],
              success: false,
              total: 0
            }
          }
        }}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        headerTitle='Ticket table'
        //Khi ProTable được render hoặc có sự thay đổi ở bộ lọc, tìm kiếm, phân trang, nó sẽ tự động gọi hàm request
        toolBarRender={() => [
          <Button key='button' icon={<PlusOutlined />} type='primary' onClick={() => setIsNewOpen(true)}>
            New Ticket
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <NewTicket isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <UpdateTicket
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        updatedTicket={updatedTicket}
        setUpdatedTicket={setUpdatedTicket}
      />
      <DetailTicket
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        setDetailTicket={setDetailTicket}
        detailTicket={detailTicket}
      />
    </>
  )
}
export default TicketManagement
