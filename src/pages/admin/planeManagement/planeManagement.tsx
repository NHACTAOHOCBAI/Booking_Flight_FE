import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useContext, useRef, useState } from 'react'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import NewPlane from './newPlane'
import UpdatePlane from './updatePlane'
import DetailPlane from './detailPlane'
import { useDeletePlane } from '@/hooks/usePlane'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import planeApi from '@/apis/apis/plane.api'
import { AppContext } from '@/context/app.context'
import Access from '@/components/access'
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
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions
  const permissions = {
    method: '',
    apiPath: '',
    model: ''
  }
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
          <Access permission={ALL_PERMISSIONS['PLANES']['PUT_PLANES']} hideChildren>
            {/* <Access permission={permissions} hideChildren> */}
            <EditOutlined
              style={{
                color: '#54a0ff'
              }}
              onClick={() => {
                setUpdatedPlane(record)
                setIsUpdateOpen(true)
              }}
            />
          </Access>
          <Access permission={ALL_PERMISSIONS['PLANES']['DELETE_PLANES']} hideChildren>
            <Popconfirm
              title='Delete the plane'
              description='Are you sure to delete this plane?'
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
          <Access permission={ALL_PERMISSIONS['PLANES']['GET_PLANES']}>
            {/* <Access permission={permissions}> */}
            <ProTable<IPlaneTable>
              rowKey='id'
              search={{
                labelWidth: 'auto'
              }}
              request={async (params) => {
                setError(null)

                try {
                  const response = await planeApi.getPlanes({
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
              headerTitle='Planes List'
              toolBarRender={() => [
                <Access permission={ALL_PERMISSIONS['PLANES']['POST_PLANES']}>
                  <Button
                    key='button'
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => {
                      setIsNewOpen(true)
                    }}
                  >
                    New Plane
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
          <NewPlane isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdatePlane
            setUpdatedPlane={setUpdatedPlane}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            updatedPlane={updatedPlane}
          />
          <DetailPlane
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
            setDetailPlane={setDetailPlane}
            detailPlane={detailPlane}
          />
        </>
      )}
    </>
  )
}
export default PlaneManagement
