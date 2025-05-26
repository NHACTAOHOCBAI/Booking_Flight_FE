import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'

import { useContext, useRef, useState } from 'react'
import NewAccount from './newAccount'
import UpdateAccount from './updateAccount.tsx'
import DetailAccount from './detailAccount.tsx'

import { useDeleteAccount } from '@/hooks/useAccount.ts'
import ErrorPage from '@/components/ErrorPage/ErrorPage.tsx'
import accountApi from '@/apis/account.api.ts'
import Access from '@/components/access.tsx'
import { AppContext } from '@/context/app.context.tsx'

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
    roleId: '3',
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
    roleId: '3'
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
  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions
  const permissions = {
    method: '',
    apiPath: '',
    model: ''
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
      render: (_, record) => {
        const roleName = (() => {
          switch (record.roleId) {
            case '1':
              return 'Employee'
            case '2':
              return 'Admin'
            default:
              return 'Client'
          }
        })()

        return <div>{roleName}</div>
      }
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
          {/* <Access permission={ALL_PERMISSIONS['ACCOUNTS']['UPDATE']} hideChildren> */}
          <Access permission={permissions} hideChildren>
            <EditOutlined
              style={{
                color: '#54a0ff'
              }}
              onClick={() => {
                setUpdateAccount(record)
                setIsUpdateOpen(true)
              }}
            />
          </Access>
          <Access permission={permissions}>
            <Popconfirm
              title='Delete the account'
              description='Are you sure to delete this account?'
              okText='Delete'
              onConfirm={() => handleDelete(record.id as string)}
              cancelText='Cancel'
            >
              {/* <Access permission={ALL_PERMISSIONS['ACCOUNTS']['DELETE']} hideChildren> */}

              <DeleteOutlined
                style={{
                  color: '#ee5253'
                }}
              />
            </Popconfirm>
          </Access>
        </div>
      )
    }
  ]

  const [error, setError] = useState<unknown>(null)
  return (
    <>
      {contextHolder}
      {error ? (
        <ErrorPage />
      ) : (
        <>
          {/* <Access permission={ALL_PERMISSIONS['ACCOUNTS']['GET_PAGINATE']}> */}
          <Access permission={permissions}>
            <ProTable<IAccountTable>
              rowKey='id'
              search={{
                labelWidth: 'auto'
              }}
              request={async (params) => {
                setError(null)

                try {
                  const response = await accountApi.getAccounts({
                    page: params.current,
                    size: params.pageSize
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
              headerTitle='Accounts List'
              toolBarRender={() => [
                // <Access permission={ALL_PERMISSIONS['ACCOUNTS']['ADD']}>
                <Access permission={permissions}>
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
                </Access>
              ]}
              pagination={{
                pageSizeOptions: [5, 10, 20],
                showSizeChanger: true,
                defaultCurrent: 1,
                defaultPageSize: 5
              }}
            />
          </Access>
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
      )}
    </>
  )
}
export default AccountManagement
