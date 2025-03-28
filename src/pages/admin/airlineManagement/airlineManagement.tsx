import { airlineData } from '@/globalType'
import { ProTable } from '@ant-design/pro-components'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import UpdatedAirline from './updateAirline'
import NewAirline from './newAirline'
import DetailAirline from './detailAirline'

const AirlineManagement = () => {
  //data
  const data: IAirlineTable[] = airlineData
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

  const columns: ProColumns<IAirlineTable>[] = [
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
            setDetailAirline(record)
            setIsDetailOpen(true)
          }}
        >
          {record.id}
        </a>
      )
    },
    {
      title: 'AirlineCode',
      dataIndex: 'airlineCode'
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
      <ProTable<IAirlineTable>
        search={{
          labelWidth: 'auto'
        }}
        dataSource={data}
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
