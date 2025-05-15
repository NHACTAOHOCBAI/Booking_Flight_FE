import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import NewSeat from './newSeat'
import UpdateSeat from './updateSeat'
import DetailSeat from './detailSeat'
import { useDeleteSeat, useGetAllSeats } from '@/hooks/useSeat'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'

const SeatManagement = () => {
  //detail
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailSeat, setDetailSeat] = useState<ISeatTable>({
    id: '',
    seatCode: '',
    seatName: '',
    description: '',
    price: 0
  })

  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedSeat, setUpdatedSeat] = useState<ISeatTable>({
    id: '',
    seatCode: '',
    seatName: '',
    description: '',
    price: 0
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)

  // delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeleteSeat()
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
          content: 'Cant delete this seat, this seat have been used in somewhere'
        })
      }
    })
  }
  //Table
  const actionRef = useRef<ActionType>(null)
  const columns: ProColumns<ISeatTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Seat Code',
      search: false,
      render: (_, record) => (
        <a
          style={{ color: '#3498db' }}
          onClick={() => {
            setDetailSeat(record)
            setIsDetailOpen(true)
          }}
        >
          {record.seatCode}
        </a>
      )
    },
    {
      title: 'SeatName',
      dataIndex: 'seatName'
    },
    {
      title: 'Price',
      render: (_, record) => <div>{record.price}% </div>
    },
    {
      title: 'Description',
      dataIndex: 'description'
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
              setUpdatedSeat(record)
              setIsUpdateOpen(true)
            }}
          />
          <Popconfirm
            title='Delete the seat'
            description='Are you sure to delete this seat?'
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
  //fetch data
  const { isLoading, isError, error, data } = useGetAllSeats()
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
      <ProTable<ISeatTable>
        search={{
          labelWidth: 'auto'
        }}
        dataSource={data.data}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        headerTitle='Seat table'
        //Khi ProTable được render hoặc có sự thay đổi ở bộ lọc, tìm kiếm, phân trang, nó sẽ tự động gọi hàm request
        toolBarRender={() => [
          <Button key='button' icon={<PlusOutlined />} type='primary' onClick={() => setIsNewOpen(true)}>
            New Seat
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <NewSeat isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <UpdateSeat
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        updatedSeat={updatedSeat}
        setUpdatedSeat={setUpdatedSeat}
      />
      <DetailSeat
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        setDetailSeat={setDetailSeat}
        detailSeat={detailSeat}
      />
    </>
  )
}
export default SeatManagement
