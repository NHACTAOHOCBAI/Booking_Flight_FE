import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import UpdatedAirline from './updateAirline'
import NewAirline from './newAirline'
import DetailAirline from './detailAirline'
import { useDeleteAirline, useGetAllAirlines } from '@/hooks/useAirline'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import LoadingError from '@/components/ErrorPage/LoadingError'

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
          <EditOutlined
            style={{
              color: '#54a0ff'
            }}
            onClick={() => {
              setUpdatedAirline(record)
              setIsUpdateOpen(true)
            }}
          />
          <Popconfirm
            title='Delete the Airline'
            description='Are you sure to delete this Airline?'
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
  const { isLoading, isError, error, data } = useGetAllAirlines()
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
      <ProTable<IAirlineTable>
        search={{
          labelWidth: 'auto'
        }}
        dataSource={data.data}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        headerTitle='Airline table'
        toolBarRender={() => [
          <Button key='button' icon={<PlusOutlined />} type='primary' onClick={() => setIsNewOpen(true)}>
            New Airline
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <UpdatedAirline
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        updatedAirline={updatedAirline}
        setUpdatedAirline={setUpdatedAirline}
      />
      <NewAirline isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <DetailAirline isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} detailAirline={detailAirline} />
    </>
  )
}

export default AirlineManagement
