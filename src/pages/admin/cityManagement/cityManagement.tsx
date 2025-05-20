import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useRef, useState } from 'react'

import NewCity from './newCity'
import UpdateCity from './updateCity'

import { useDeleteCity } from '@/hooks/useCity'
import DetailCity from './detailCity'
import LoadingError from '@/components/ErrorPage/LoadingError'
import ErrorPage from '@/components/ErrorPage/ErrorPage'
import cityApi from '@/apis/city.api'
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
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeleteCity()
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
          content: 'Cant delete this city, this city have been used in somewhere'
        })
      }
    })
  }

  //Detail
  const [detailCity, setDetailCity] = useState<ICityTable>({
    id: '',
    cityCode: '',
    cityName: ''
  })

  const columns: ProColumns<ICityTable>[] = [
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
            setDetailCity(record)
            setIsDetailOpen(true)
          }}
        >
          {record.cityCode}
        </a>
      )
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

  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const [error, setError] = useState<unknown>(null)
  const [loading, setLoading] = useState(true)
  return (
    <>
      {contextHolder}
      {loading && <LoadingError />}
      {error && <ErrorPage />}
      <ProTable<ICityTable>
        rowKey='id'
        search={{
          labelWidth: 'auto'
        }}
        request={async (params) => {
          setLoading(true)
          setError(null)

          try {
            const response = await cityApi.getCities({
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
        actionRef={actionRef}
        headerTitle='City Table'
        bordered
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
      <DetailCity isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} detailCity={detailCity} />
    </>
  )
}
export default CityManagement
