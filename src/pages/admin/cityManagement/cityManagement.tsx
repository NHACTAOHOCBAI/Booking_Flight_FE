import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'
import { useContext, useRef, useState } from 'react'

import NewCity from './newCity'
import UpdateCity from './updateCity'

import { useDeleteCity } from '@/hooks/useCity'
import DetailCity from './detailCity'

import ErrorPage from '@/components/ErrorPage/ErrorPage'
import cityApi from '@/apis/apis/city.api'
import { AppContext } from '@/context/app.context'
import Access from '@/components/access'
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
      onSuccess: async () => {
        await actionRef.current?.reload()
        messageApi.success("Delete city successfully");
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

  //Detail
  const [detailCity, setDetailCity] = useState<ICityTable>({
    id: '',
    cityCode: '',
    cityName: ''
  })
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions

  const columns: ProColumns<ICityTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Code',
      dataIndex: 'cityCode',
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
          <Access permission={ALL_PERMISSIONS['CITIES']['PUT_CITIES']} hideChildren>
            {
              record.canUpdate ?
                <EditOutlined
                  style={{
                    color: '#54a0ff'
                  }}
                  onClick={() => {
                    setUpdatedCity(record)
                    setIsUpdateOpen(true)
                  }}
                />
                :
                <div className="text-gray-400 cursor-not-allowed"><EditOutlined /></div>
            }
          </Access>
          <Access permission={ALL_PERMISSIONS['CITIES']['DELETE_CITIES']} hideChildren>
            {
              record.canDelete ?
                <Popconfirm
                  title='Delete the account'
                  description='Are you sure to delete this account?'
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

  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [error, setError] = useState<unknown>(null)
  return (
    <>
      {contextHolder}
      {error ? (
        <ErrorPage />
      ) : (
        <>
          {/* <Access permission={ALL_PERMISSIONS['CITIES']['GET_USER']}> */}
          {/* <Access permission={permissions}> */}
          <ProTable<ICityTable>
            rowKey='id'
            search={{
              labelWidth: 'auto'
            }}
            request={async (params) => {
              setError(null)

              try {
                const filters: string[] = []

                if (params.cityCode) {
                  filters.push(`cityCode:'${params.cityCode.trim()}'`)
                }

                if (params.cityName) {
                  filters.push(`cityName~'${params.cityName.trim()}'`)
                }

                const filterString = filters.length > 0 ? filters.join(' and ') : undefined
                const response = await cityApi.getCities({
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
            headerTitle='Citys List'
            toolBarRender={() => [
              <Access permission={ALL_PERMISSIONS['CITIES']['POST_CITIES']} hideChildren>
                {/* <Access permission={permissions}> */}
                <Button
                  key='button'
                  icon={<PlusOutlined />}
                  type='primary'
                  onClick={() => {
                    setIsNewOpen(true)
                  }}
                >
                  New City
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
          <NewCity refetchData={() => actionRef.current?.reload()} isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdateCity
            refetchData={() => actionRef.current?.reload()}
            setUpdatedCity={setUpdatedCity}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            updatedCity={updatedCity}
          />
          <DetailCity isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} detailCity={detailCity} />
        </>
      )}
    </>
  )
}
export default CityManagement
