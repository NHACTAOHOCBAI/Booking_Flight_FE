import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import NewAirport from './newAirport'
import UpdateAirport from './updateAirport'
import DetailAirport from './detailAirport'
import { useDeleteAirport } from '@/hooks/useAirport'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'
import airportApi from '@/apis/airport.api'
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
          content: 'Cant delete this airport, this airport have been used in somewhere'
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

  const columns: ProColumns<IAirportTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Code',
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
      title: 'Airport',
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
          <EditOutlined
            style={{
              color: '#54a0ff'
            }}
            onClick={() => {
              setIsUpdateOpen(true)
              setUpdatedAirport(record)
            }}
          />
          <Popconfirm
            title='Delete the airport'
            description='Are you sure to delete this airport?'
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
      <ProTable<IAirportTable>
        rowKey='id'
        search={{
          labelWidth: 'auto'
        }}
        request={async (params) => {
          setLoading(true)
          setError(null)

          try {
            const response = await airportApi.getAirports({
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
        bordered
        actionRef={actionRef}
        cardBordered
        headerTitle='Airport Table'
        toolBarRender={() => [
          <Button key='button' icon={<PlusOutlined />} onClick={() => setIsNewOpen(true)} type='primary'>
            New Airport
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <NewAirport isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <UpdateAirport
        updatedAirport={updatedAirport!}
        setUpdatedAirport={setUpdatedAirport}
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
      />
      <DetailAirport isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} detailAirport={detailAirport} />
    </>
  )
}
export default AirportManagement
