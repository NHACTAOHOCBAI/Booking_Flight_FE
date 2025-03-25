import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'

import { useRef, useState } from 'react'
import { accountData } from '@/globalType'
import NewAccount from './newAccount'
import UpdateAccount from './updateAccount.tsx'

const AccountManagement = () => {
  //table
  const actionRef = useRef<ActionType>(null)
  const data: IAccountTable[] = accountData

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

  //delete
  const handleDelete = (value: IAccountTable) => {
    console.log(value)
  }

  const columns: ProColumns<IAccountTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'Id',
      search: false,
      render: (_, record) => <a style={{ color: '#3498db' }}>{record.id}</a>
    },
    {
      title: 'Username',
      dataIndex: 'username',
      copyable: true
    },
    {
      title: 'Password',
      dataIndex: 'password',
      copyable: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      copyable: true
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
        user: { text: 'User' },
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
            onConfirm={() => handleDelete(record)}
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
  // const handleRequest = async (
  //   params: {
  //     pageSize: number
  //     current: number
  //   },
  //   sort: Record<string, SortOrder>,
  //   filter: Record<string, (string | number)[] | null>
  // ) => {
  //   console.log(params)
  //   return {
  //     data: {}, // Dữ liệu bảng
  //     success: true,
  //     total: 10
  //   }
  // }
  return (
    <>
      <ProTable<IAccountTable>
        dataSource={data}
        columns={columns}
        actionRef={actionRef}
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
    </>
  )
}
export default AccountManagement
