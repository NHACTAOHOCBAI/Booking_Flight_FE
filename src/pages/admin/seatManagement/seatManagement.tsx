import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useContext, useRef, useState } from 'react'
import NewSeat from './newSeat'
import UpdateSeat from './updateSeat'
import DetailSeat from './detailSeat'
import { useDeleteSeat } from '@/hooks/useSeat'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'
import seatApi from '@/apis/apis/seat.api'
import { AppContext } from '@/context/app.context'
import Access from '@/components/access'

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
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions
  const permissions = {
    method: '',
    apiPath: '',
    model: ''
  }
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
          <Access permission={ALL_PERMISSIONS['SEATS']['PUT_SEATS']} hideChildren>
            <EditOutlined
              style={{
                color: '#54a0ff'
              }}
              onClick={() => {
                setUpdatedSeat(record)
                setIsUpdateOpen(true)
              }}
            />
          </Access>
          <Access permission={ALL_PERMISSIONS['SEATS']['DELETE_SEATS']} hideChildren>
            <Popconfirm
              title='Delete the seat'
              description='Are you sure to delete this seat?'
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
          <Access permission={ALL_PERMISSIONS['SEATS']['GET_SEATS']}>
            {/* <Access permission={permissions}> */}
            <ProTable<ISeatTable>
              rowKey='id'
              search={{
                labelWidth: 'auto'
              }}
              request={async (params) => {
                setError(null)

                try {
                  const response = await seatApi.getSeats({
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
              headerTitle='Seats List'
              toolBarRender={() => [
                <Access permission={ALL_PERMISSIONS['SEATS']['POST_SEATS']}>
                  {/* <Access permission={permissions}> */}
                  <Button
                    key='button'
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => {
                      setIsNewOpen(true)
                    }}
                  >
                    New Seat
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
          <NewSeat isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdateSeat
            setUpdatedSeat={setUpdatedSeat}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            updatedSeat={updatedSeat}
          />
          <DetailSeat
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
            setDetailSeat={setDetailSeat}
            detailSeat={detailSeat}
          />
        </>
      )}
    </>
  )
}
export default SeatManagement
