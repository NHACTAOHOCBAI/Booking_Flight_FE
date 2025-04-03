import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import NewAirport from './newAirport'
import UpdateAirport from './updateAirport'
import { toCity } from '@/utils/convert'
import { useGetAllAirports } from '@/hooks/useAirport'
const AirportManagement = () => {
  //Table
  const actionRef = useRef<ActionType>(null)
  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedAirport, setUpdatedAirport] = useState<IAirportTable>({
    id: '',
    airportCode: '',
    airportName: '',
    cityId: ''
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)
  // delete
  const handleDelete = (value: IAirportTable) => {
    console.log(value)
  }
  const columns: ProColumns<IAirportTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Code',
      render: (_, record) => <a style={{ color: '#3498db' }}>{record.airportCode}</a>
    },
    {
      title: 'Airport',
      dataIndex: 'airportName'
    },
    {
      title: 'City',
      render: (_, record) => <div>{toCity(record.cityId as string).cityName}</div>
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
            onConfirm={() => handleDelete(record)}
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
  const { isPending, error, data } = useGetAllAirports();

  return (
    <>
      <ProTable<IAirportTable>
        search={{
          labelWidth: 'auto',
        }}
        dataSource={data}
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
    </>
  )
}
export default AirportManagement
