import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import NewAirport from './newAirport'
import UpdateAirport from './updateAirport'
import DetailAirport from './detailAirport'
import { useDeleteAirport, useGetAllAirports } from '@/hooks/useAirport'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'
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
      title: 'City',
      render: (_, record) => <div>{record.cityId}</div>
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
  //fetch data
  const { isLoading, isError, error, data } = useGetAllAirports()
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
      <ProTable<IAirportTable>
        search={{
          labelWidth: 'auto'
        }}
        dataSource={data.data}
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
