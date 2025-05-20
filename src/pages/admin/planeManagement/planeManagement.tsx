import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import NewPlane from './newPlane'
import UpdatePlane from './updatePlane'
import DetailPlane from './detailPlane'
import { useDeletePlane } from '@/hooks/usePlane'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'
import planeApi from '@/apis/plane.api'
const PlaneManagement = () => {
  //detail
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailPlane, setDetailPlane] = useState<IPlaneTable>({
    id: '',
    airlineId: '',
    planeCode: '',
    planeName: '',
    airlineName: ''
  })
  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedPlane, setUpdatedPlane] = useState<IPlaneTable>({
    id: '',
    airlineId: '',
    planeCode: '',
    planeName: '',
    airlineName: ''
  })
  //new
  const [isNewOpen, setIsNewOpen] = useState(false)

  // delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeletePlane()
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
          content: 'Cant delete this plane, this plane have been used in somewhere'
        })
      }
    })
  }

  //Table
  const actionRef = useRef<ActionType>(null)

  const columns: ProColumns<IPlaneTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Code',
      search: false,
      render: (_, record) => (
        <a
          style={{ color: '#3498db' }}
          onClick={() => {
            setDetailPlane(record)
            setIsDetailOpen(true)
          }}
        >
          {record.planeCode}
        </a>
      )
    },
    {
      title: 'Airline',
      render: (_, record) => <div>{record.airlineName}</div>
    },
    {
      title: 'PlaneName',
      dataIndex: 'planeName'
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
              setUpdatedPlane(record)
              setIsUpdateOpen(true)
            }}
          />
          <Popconfirm
            title='Delete the plane'
            description='Are you sure to delete this plane?'
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
  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  return (
    <>
      {contextHolder}
      {loading && <LoadingError />}
      {error && <ErrorPage />}
      <ProTable<IPlaneTable>
        rowKey='id'
        search={{
          labelWidth: 'auto'
        }}
        request={async (params) => {
          setLoading(true)
          setError(null)

          try {
            const response = await planeApi.getPlanes({
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
        headerTitle='Plane table'
        toolBarRender={() => [
          <Button key='button' icon={<PlusOutlined />} type='primary' onClick={() => setIsNewOpen(true)}>
            New Plane
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <NewPlane isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <UpdatePlane
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        updatedPlane={updatedPlane}
        setUpdatedPlane={setUpdatedPlane}
      />
      <DetailPlane
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        setDetailPlane={setDetailPlane}
        detailPlane={detailPlane}
      />
    </>
  )
}
export default PlaneManagement
