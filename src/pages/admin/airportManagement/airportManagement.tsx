import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useContext, useRef, useState } from 'react'
import NewAirport from './newAirport'
import UpdateAirport from './updateAirport'
import DetailAirport from './detailAirport'
import { useDeleteAirport } from '@/hooks/useAirport'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import airportApi from '@/apis/apis/airport.api'
import { AppContext } from '@/context/app.context'
import Access from '@/components/access'
const AirportManagement = () => {
  //Table
  const actionRef = useRef<ActionType>(null)
  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedAirport, setUpdatedAirport] = useState<IAirportTable>({
    id: '',
    airportCode: '',
    airportName: '',
    cityId: '',
    cityName: ''
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)
  // delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeleteAirport()
  const handleDelete = (id: string) => {
    handleDeleteMutation.mutate(id, {
      onSuccess: async () => {
        await actionRef.current?.reload()
        messageApi.success("Delete airline successfully");
      },
      onError(error) {
        messageApi.open({
          type: 'error',
          content: error.message
        })
      }
    })
  }

  //Detail
  const [detailAirport, setDetailAirport] = useState<IAirportTable>({
    id: '',
    airportCode: '',
    airportName: '',
    cityId: '',
    cityName: ''
  })
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions

  const columns: ProColumns<IAirportTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Code',
      dataIndex: 'airportCode',
      render: (_, record) => (
        <a
          style={{ color: '#3498db' }}
          onClick={() => {
            setDetailAirport(record)
            setIsDetailOpen(true)
          }}
        >
          {record.airportCode}
        </a>
      )
    },
    {
      title: 'Airport',
      dataIndex: 'airportName'
    },
    {
      title: 'City Name',
      search: false,
      dataIndex: 'cityName'
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
          <Access permission={ALL_PERMISSIONS['AIRPORTS']['PUT_AIRPORTS']} hideChildren>
            {/* <Access permission={permissions} hideChildren> */}
            {
              record.canUpdate ?
                <EditOutlined
                  style={{
                    color: '#54a0ff'
                  }}
                  onClick={() => {
                    setUpdatedAirport(record)
                    setIsUpdateOpen(true)
                  }}
                />
                :
                <div className="text-gray-400 cursor-not-allowed"><EditOutlined /></div>
            }
          </Access>
          <Access permission={ALL_PERMISSIONS['AIRPORTS']['DELETE_AIRPORTS']} hideChildren>
            {
              record.canDelete ?
                <Popconfirm
                  title='Delete the airport'
                  description='Are you sure to delete this airport?'
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
                :
                <div className="text-gray-400 cursor-not-allowed"><DeleteOutlined /></div>
            }
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
          {/* <Access permission={ALL_PERMISSIONS['AIRPORTS']['GET_USER']}> */}
          {/* <Access permission={permissions}> */}
          <ProTable<IAirportTable>
            rowKey='id'
            search={{
              labelWidth: 'auto'
            }}
            request={async (params) => {
              setError(null)

              try {
                const filters: string[] = []

                if (params.airportCode) {
                  filters.push(`airportCode:'${params.airportCode.trim()}'`)
                }

                if (params.airportName) {
                  filters.push(`airportName~'${params.airportName.trim()}'`)
                }

                const filterString = filters.length > 0 ? filters.join(' and ') : undefined

                const response = await airportApi.getAirports({
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
            headerTitle='airports List'
            toolBarRender={() => [
              <Access permission={ALL_PERMISSIONS['AIRPORTS']['POST_AIRPORTS']} hideChildren>
                <Button
                  key='button'
                  icon={<PlusOutlined />}
                  type='primary'
                  onClick={() => {
                    setIsNewOpen(true)
                  }}
                >
                  New airport
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

          <NewAirport
            refetchData={() => actionRef.current?.reload()}
            isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdateAirport
            refetchData={() => actionRef.current?.reload()}
            updatedAirport={updatedAirport!}
            setUpdatedAirport={setUpdatedAirport}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
          />
          <DetailAirport isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} detailAirport={detailAirport} />
        </>
      )}
    </>
  )
}
export default AirportManagement
