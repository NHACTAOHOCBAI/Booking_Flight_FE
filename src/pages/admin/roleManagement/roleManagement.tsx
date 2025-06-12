import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns, ProSchemaValueEnumType } from '@ant-design/pro-components'
import { ProTable } from '@ant-design/pro-components'
import { Button, message, Popconfirm } from 'antd'

import { useContext, useMemo, useRef, useState } from 'react'
import NewRole from './newRole.tsx'
import UpdateRole from './updateRole.tsx'

import { useDeleteRole, useGetAllRoles } from '@/hooks/useRole.ts'
import ErrorPage from '@/components/ErrorPage/ErrorPage.tsx'
import roleApi from '@/apis/apis/role.api.ts'
import { AppContext } from '@/context/app.context.tsx'
import Access from '@/components/access.tsx'

const RoleManagement = () => {
  //table
  const actionRef = useRef<ActionType>(null)

  //new
  const [isNewOpen, setIsNewOpen] = useState(false)

  //update
  const [isUpdateOpen, setIsUpdateOpen] = useState(false)
  const [updatedRole, setUpdateRole] = useState<IRoleTable>({
    id: '',
    roleName: '',
    description: '',
    permissions: []
  })

  // delete
  const [messageApi, contextHolder] = message.useMessage()
  const handleDeleteMutation = useDeleteRole()
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

  const ALL_PERMISSIONS = useContext(AppContext).PERMISSIONS.permissions

  const columns: ProColumns<IRoleTable>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48
    },
    {
      title: 'RoleName',
      dataIndex: 'roleName',
      valueEnum: roleEnum
    },

    {
      title: 'Description',
      search: false,
      dataIndex: 'description'
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
          <Access permission={ALL_PERMISSIONS['ROLES']['PUT_ROLES']} hideChildren>
            {/* <Access permission={permissions} hideChildren> */}
            <EditOutlined
              style={{
                color: '#54a0ff'
              }}
              onClick={() => {
                setUpdateRole(record)
                setIsUpdateOpen(true)
              }}
            />
          </Access>
          <Access permission={ALL_PERMISSIONS['ROLES']['DELETE_ROLES']} hideChildren>
            <Popconfirm
              title='Delete the role'
              description='Are you sure to delete this role?'
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
          <Access permission={ALL_PERMISSIONS['ROLES']['GET_ROLES']}>
            {/* <Access permission={permissions}> */}
            <ProTable<IRoleTable>
              rowKey='id'
              search={{
                labelWidth: 'auto'
              }}
              request={async (params) => {
                setError(null)

                try {
                  const filters: string[] = []

                  if (params.roleName) {
                    filters.push(`roleName:'${params.roleName.trim()}'`)
                  }

                  const filterString = filters.length > 0 ? filters.join(' and ') : undefined
                  const response = await roleApi.getRoles({
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
              headerTitle='Roles List'
              toolBarRender={() => [
                <Access permission={ALL_PERMISSIONS['ROLES']['POST_ROLES']} hideChildren>
                  <Button
                    key='button'
                    icon={<PlusOutlined />}
                    type='primary'
                    onClick={() => {
                      setIsNewOpen(true)
                    }}
                  >
                    New Role
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
          <NewRole isNewOpen={isNewOpen} setIsNewOpen={setIsNewOpen} />
          <UpdateRole
            setUpdatedRole={setUpdateRole}
            isUpdateOpen={isUpdateOpen}
            setIsUpdateOpen={setIsUpdateOpen}
            updatedRole={updatedRole}
          />
        </>
      )}
    </>
  )
}
export default RoleManagement
