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
import accountApi from '@/apis/apis/account.api.ts'
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
    role: {
      roleName: '',
      description: '',
      permissions: []
    },
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
    role: {
      roleName: '',
      description: '',
      permissions: []
    }
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

  const { PERMISSIONS } = useContext(AppContext)
  const ALL_PERMISSIONS = PERMISSIONS.permissions

  const columns: ProColumns<IAccountTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
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
    {
      title: 'Role',
      render: (_, record) => {
        return <div>{record.role?.roleName}</div>
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
          <Access permission={ALL_PERMISSIONS['ACCOUNTS']['PUT_ACCOUNTS']} hideChildren>
            {/* <Access permission={permissions} hideChildren> */}
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
          <Access permission={ALL_PERMISSIONS['ACCOUNTS']['DELETE_ACCOUNTS']} hideChildren>
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
          <Access permission={ALL_PERMISSIONS['ACCOUNTS']['GET_ACCOUNTS']} hideChildren>
            {/* <Access permission={ALL_PERMISSIONS}> */}
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
                <Access permission={ALL_PERMISSIONS['ACCOUNTS']['POST_ACCOUNTS']} hideChildren>
                  {/* <Access permission={permissions}> */}
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
