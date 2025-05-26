/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, message, Row } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { onErrorUtil, SuccessResponse } from '@/globalType/util.type'
import { FooterToolbar, ModalForm, ProCard, ProFormSwitch, ProFormText } from '@ant-design/pro-components'
import { useUpdateRole } from '@/hooks/useRole'
import { GroupPermission, IPermission } from '@/globalType/permission.type'
import http from '@/utils/http'
import { useQuery } from '@tanstack/react-query'
import ModuleApi from './moduleApi'
import { groupByPermission } from '@/utils/utils'
interface IProp {
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  updatedRole: IRoleTable
  setUpdatedRole: (value: IRoleTable) => void
}
const UpdateRole = (props: IProp) => {
  const { isUpdateOpen, setIsUpdateOpen, updatedRole, setUpdatedRole } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const updateRoleMutation = useUpdateRole()

  const onFinish = async (value: any) => {
    const body = {
      roleName: value.roleName,
      permissionIds: value.permissionIds,
      description: value.description
    }
    updateRoleMutation.mutate(body, {
      onSuccess(data) {
        messageApi.open({
          type: 'success',
          content: data.message
        })
        handleCancel()
      },
      onError(error: Error) {
        console.log(error)
        const messageError = onErrorUtil(error)
        messageApi.open({
          type: messageError.type,
          content: messageError.content
        })
      }
    })
  }
  const handleCancel = () => {
    form.resetFields()
    setUpdatedRole({
      id: '',
      roleName: '',
      description: '',
      permissionIds: []
    })
    setIsUpdateOpen(false)
  }
  const listPermissionData = useQuery({
    queryKey: ['permissions'],
    queryFn: async () => {
      const res = await http.get<SuccessResponse<IPermission[]>>('api/permissions')
      return res.data
    },
    enabled: isUpdateOpen
  })
  let listPermissions: GroupPermission[]
  if (listPermissionData.data) listPermissions = groupByPermission(listPermissionData?.data.data)
  else listPermissions = []
  return (
    <>
      {contextHolder}
      <ModalForm
        title='Update Role'
        open={isUpdateOpen}
        modalProps={{
          onCancel: () => {
            handleCancel()
          },
          afterClose: () => handleCancel(),
          destroyOnClose: true,
          keyboard: false,
          maskClosable: false
        }}
        scrollToFirstError={true}
        preserve={false}
        form={form}
        onFinish={onFinish}
        submitter={{
          render: (_: any, dom: any) => <FooterToolbar>{dom}</FooterToolbar>,
          submitButtonProps: {
            icon: <PlusOutlined />
          },
          searchConfig: {
            resetText: 'Cancel',
            submitText: 'Create update'
          }
        }}
      >
        <Row gutter={16}>
          <Col lg={12} md={12} sm={24} xs={24}>
            <ProFormText
              label='Role Name'
              name='roleName'
              rules={[{ required: true, message: 'Please input role name' }]}
              placeholder='Role name'
            />
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <ProFormSwitch
              label='Status'
              name='active'
              checkedChildren='ACTIVE'
              unCheckedChildren='INACTIVE'
              initialValue={true}
              fieldProps={{
                defaultChecked: true
              }}
            />
          </Col>

          <Col span={24}>
            <ProCard
              title='Permission'
              subTitle="This role's permissions"
              headStyle={{ color: '#d81921' }}
              style={{ marginBottom: 20 }}
              headerBordered
              size='small'
              bordered
            >
              <ModuleApi
                form={form}
                listPermissions={listPermissions}
                singleRole={updatedRole}
                openModal={isUpdateOpen}
              />
            </ProCard>
          </Col>
        </Row>
      </ModalForm>
    </>
  )
}

export default UpdateRole
