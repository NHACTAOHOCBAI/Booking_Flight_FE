import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'
import { useRef, useState } from 'react'
import NewSeat from './newSeat'
import UpdateSeat from './updateSeat'
import { getSeat } from '@/apis/seat.api'
import { useQuery } from '@tanstack/react-query'
const SeatManagement = () => {
  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedSeat, setUpdatedSeat] = useState<ISeatItem>({
    _id: '',
    name: '',
    price: 0,
    description: ''
  })
  //New
  const [isNewOpen, setIsNewOpen] = useState(false)
  //Table
  const actionRef = useRef<ActionType>(null)
  const data: ISeatItem[] = [
    {
      _id: 'HG01',
      name: 'Economy Class',
      price: 100,
      description: 'Basic seating with standard amenities.'
    },
    {
      _id: 'HG02',
      name: 'Business Class',
      price: 150,
      description: 'Spacious seating with premium services.'
    },
    {
      _id: 'HG03',
      name: 'First Class',
      price: 200,
      description: 'Luxury seating with top-tier comfort and exclusivity.'
    }
  ]
  const columns: ProColumns<ISeatItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'ID',
      search: false,
      render: (_, record) => <a style={{ color: '#3498db' }}>{record._id}</a>
    },
    {
      title: 'Name',
      dataIndex: 'name'
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
          <EditOutlined
            style={{
              color: '#54a0ff'
            }}
            onClick={() => {
              setIsUpdateOpen(true)
              setUpdatedSeat(record)
            }}
          />
          <Popconfirm
            title='Delete the airport'
            description='Are you sure to delete this seat?'
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
      <ProTable<ISeatItem>
        dataSource={data}
        columns={columns}
        actionRef={actionRef}
        cardBordered
        bordered
        search={false}
        headerTitle='Existing Seat Class'
        //Khi ProTable được render hoặc có sự thay đổi ở bộ lọc, tìm kiếm, phân trang, nó sẽ tự động gọi hàm request
        toolBarRender={() => [
          <Button key='button' icon={<PlusOutlined />} type='primary' onClick={() => setIsNewOpen(true)}>
            New Seat
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <NewSeat isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <UpdateSeat
        updatedSeat={updatedSeat!}
        setUpdatedSeat={setUpdatedSeat}
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
      />
    </>
  )
}
export default SeatManagement
