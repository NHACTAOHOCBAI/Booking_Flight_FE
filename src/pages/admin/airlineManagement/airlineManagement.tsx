import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useContext, useRef, useState } from 'react'
import UpdatedAirline from './updateAirline'
import NewAirline from './newAirline'
import DetailAirline from './detailAirline'
import { useDeleteAirline } from '@/hooks/useAirline'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import airlineApi from '@/apis/airline.api'
import Access from '@/components/access'
import { AppContext } from '@/context/app.context'

const AirlineManagement = () => {
  //data
  const actionRef = useRef<ActionType>(null)

  //new
  const [isNewOpen, setIsNewOpen] = useState(false)
  //detail
  const [detailAirline, setDetailAirline] = useState<IAirlineTable>({
    id: '',
    airlineCode: '',
    airlineName: ''
  })
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  //update
  const [updatedAirline, setUpdatedAirline] = useState<IAirlineTable>({
    id: '',
    airlineCode: '',
    airlineName: ''
  })
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)

  //delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeleteAirline()
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
  const permissions = {
    method: '',
    apiPath: '',
    model: ''
  }
  const columns: ProColumns<IAirlineTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Airline Code',
      search: false,
      render: (_, record) => (
        <a
          style={{ color: '#3498db' }}
          onClick={() => {
            setDetailAirline(record)
            setIsDetailOpen(true)
          }}
        >
          {record.airlineCode}
        </a>
      )
    },
    {
      title: 'AirlineName',
      dataIndex: 'airlineName'
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
                setUpdatedAirline(record)
                setIsUpdateOpen(true)
              }}
            />
          </Access>
          <Access permission={permissions}>
            <Popconfirm
              title='Delete the airline'
              description='Are you sure to delete this airline?'
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
            <ProTable<IAirlineTable>
              rowKey='id'
              search={{
                labelWidth: 'auto'
              }}
              request={async (params) => {
                setError(null)

                try {
                  const response = await airlineApi.getAirlines({
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
              headerTitle='Airlines List'
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
                    New Account
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
          <UpdatedAirline
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            updatedAirline={updatedAirline}
            setUpdatedAirline={setUpdatedAirline}
          />
          <NewAirline isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <DetailAirline isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} detailAirline={detailAirline} />
        </>
      )}
    </>
  )
}

export default AirlineManagement
