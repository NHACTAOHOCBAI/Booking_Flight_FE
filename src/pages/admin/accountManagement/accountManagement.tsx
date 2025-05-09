import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'

import { useRef, useState } from 'react'
import NewAccount from './newAccount'
import UpdateAccount from './updateAccount.tsx'
import DetailAccount from './detailAccount.tsx'

import { useDeleteAccount, useGetAllAccounts } from '@/hooks/account..ts'
import ErrorPage from '@/components/ErrorPage/ErrorPage.tsx'
import LoadingError from '@/components/ErrorPage/LoadingError.tsx'

const AccountManagement = () => {
  //table
  const actionRef = useRef<ActionType>(null)

  //detail
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailAccount, setDetailAccount] = useState<IAccountTable>({
    id: '',
    email: '',
    fullName: '',
    password: '',
    phone: '',
    role: 3,
    username: ''
  })

  //new
  const [isNewOpen, setIsNewOpen] = useState(false)

  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedAccount, setUpdateAccount] = useState<IAccountTable>({
    id: '',
    fullName: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 3
  })

  // delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeleteAccount()
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
  const columns: ProColumns<IAccountTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Username',
      render: (_, record) => (
        <a
          style={{ color: '#3498db' }}
          onClick={() => {
            setDetailAccount(record)
            setIsDetailOpen(true)
          }}
        >
          {record.username}
        </a>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Full name',
      dataIndex: 'fullName'
    },
    // role hien thi
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    //role tim kiem
    {
      title: 'Role',
      dataIndex: 'role',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        admin: { text: 'Admin' },
        employee: { text: 'Employee' },
        client: { text: 'Client' }
      }
    },
    {
      title: 'Role',
      dataIndex: 'role',
      search: false
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
              setUpdateAccount(record)
              setIsUpdateOpen(true)
            }}
          />
          <Popconfirm
            title='Delete the airport'
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
        </div>
      )
    }
  ]

  //fetch data
  const { isLoading, isError, error, data } = useGetAllAccounts()
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
      <ProTable<IAccountTable>
        dataSource={data.data}
        columns={columns}
        actionRef={actionRef}
        bordered
        cardBordered
        headerTitle='Accounts List'
        // request={handleRequest}
        //Khi ProTable được render hoặc có sự thay đổi ở bộ lọc, tìm kiếm, phân trang, nó sẽ tự động gọi hàm request
        toolBarRender={() => [
          <Button
            key='button'
            icon={<PlusOutlined />}
            type='primary'
            onClick={() => {
              setIsNewOpen(true)
            }}
          >
            New Account
          </Button>
        ]}
        pagination={{
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
          defaultCurrent: 1,
          defaultPageSize: 5
        }}
      />
      <NewAccount isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
      <UpdateAccount
        setUpdatedAccount={setUpdateAccount}
        isUpdateOpen={isUpdateOpen}
        setIsUpdateOpen={setIsUpdateOpen}
        updatedAccount={updatedAccount}
      />
      <DetailAccount
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        setDetailAccount={setDetailAccount}
        detailAccount={detailAccount}
      />
    </>
  )
}
export default AccountManagement
