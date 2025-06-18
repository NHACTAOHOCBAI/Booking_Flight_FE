import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'

import { useContext, useMemo, useRef, useState } from 'react'
import NewAccount from './newAccount'
import UpdateAccount from './updateAccount.tsx'
import DetailAccount from './detailAccount.tsx'

import { useDeleteAccount } from '@/hooks/useAccount.ts'
import ErrorPage from '@/components/ErrorPage/ErrorPage.tsx'
import accountApi from '@/apis/apis/account.api.ts'
import Access from '@/components/access.tsx'
import { AppContext } from '@/context/app.context.tsx'
import { useGetAllRoles } from '@/hooks/useRole.ts'
import type { ProSchemaValueEnumType } from '@ant-design/pro-components'

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
      onSuccess: async () => {
        await actionRef.current?.reload()
        messageApi.success("Delete account successfully");
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
  const roleData = useGetAllRoles({}).data?.data.result as IRoleTable[] | undefined
  const roleEnum: Record<string, ProSchemaValueEnumType> = useMemo(() => {
    if (!roleData) return {}

    return roleData.reduce(
      (acc, role) => {
        acc[role.roleName] = {
          text: role.roleName
        }
        return acc
      },
      {} as Record<string, ProSchemaValueEnumType>
    )
  }, [roleData])
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
      dataIndex: 'email',
      valueType: 'text'
    },
    {
      title: 'Full name',
      search: false,
      dataIndex: 'fullName'
    },
    // role hien thi
    {
      title: 'Phone',
      search: false,
      dataIndex: 'phone'
    },
    {
      title: 'Role',
      dataIndex: 'roleName', // must match the key in params
      valueType: 'select',
      valueEnum: roleEnum,
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
                  const filters: string[] = []

                  if (params.email) {
                    filters.push(`email~'${params.email.trim()}'`)
                  }

                  if (params.roleName) {
                    filters.push(`role.roleName:'${params.roleName}'`)
                  }

                  const filterString = filters.length > 0 ? filters.join(' and ') : undefined

                  const response = await accountApi.getAccounts({
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
          <NewAccount refetchData={() => actionRef.current?.reload()} isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdateAccount refetchData={() => actionRef.current?.reload()}
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
