import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, Popconfirm } from 'antd'

import { useRef, useState } from 'react'
import NewAccount from './newAccount'
import UpdateAccount from './updateAccount.tsx'
import DetailAccount from './detailAccount.tsx'
import { useQuery } from '@tanstack/react-query'
import accountApi from '@/apis/account.api.ts'

const AccountManagement = () => {
  //table
  const actionRef = useRef<ActionType>(null)
  // const data: IAccountTable[] = accountData

  const { data: accountData } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => accountApi.getAccounts()
  })

  console.log(accountData)
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
  return (
    <>
      <ProTable<IAccountTable>
        dataSource={accountData?.data}
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
