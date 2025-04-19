import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm, Result, Spin } from 'antd'
import { useEffect, useRef, useState } from 'react'

import NewCity from './newCity'
import UpdateCity from './updateCity'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import cityApi from '@/apis/city.api'
import { useGetAllCites } from '@/hooks/useCity'
const CityManagement = () => {
  //Table
  const actionRef = useRef<ActionType>(null)

  //New
  const [isNewOpen, setIsNewOpen] = useState(false)

  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedCity, setUpdatedCity] = useState<ICityTable>({
    id: '',
    cityCode: '',
    cityName: ''
  })

  // delete
  const handleDelete = (value: ICityTable) => {
    console.log(value)
  }

  const { data, isLoading, isError, error, } = useGetAllCites();
  console.log(data)

  if (isLoading) {
    return (
      <section style={{ height: "100%", display: 'flex', alignItems: "center", justifyContent: 'center' }}>
        <Spin size="large" />
      </section>
    )
  }

  if (isError) {
    console.log(error)
    return (
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={<Button type="primary">Back Home</Button>}
      />

    )
  }

  const columns: ProColumns<ICityTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Code',
      render: (_, record) => <a style={{ color: '#3498db' }}>{record.cityCode}</a>
    },
    {
      title: 'City',
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
              setUpdatedCity(record)
              setIsUpdateOpen(true)
            }}
          />
          <Popconfirm
            title='Delete the city'
            description='Are you sure to delete this city?'
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
  return (
    <>
      <ProTable<ICityTable>
        bordered
        search={false}
        dataSource={data?.data}
        columns={columns}
        actionRef={actionRef}
        headerTitle='City Table'
        toolBarRender={() => [
          <Button
            key='button'
            icon={<PlusOutlined />}
            onClick={() => {
              setIsNewOpen(true)
            }}
            type='primary'
          >
            New City
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <NewCity isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <UpdateCity
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        updatedCity={updatedCity}
        setUpdatedCity={setUpdatedCity}
      />
    </>
  )
}
export default CityManagement
