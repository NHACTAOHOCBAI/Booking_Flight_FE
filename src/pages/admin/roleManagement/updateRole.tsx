/* eslint-disable @typescript-eslint/no-explicit-any */
import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateRole } from '@/hooks/useRole'
import { PlusOutlined } from '@ant-design/icons'
import { ModalForm, ProCard, ProFormSwitch, ProFormText } from '@ant-design/pro-components'
import { Col, Form, message, Row } from 'antd'
import ModuleApi from './moduleApi'

interface IProp {
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  updatedRole: IRoleTable
  setUpdatedRole: (value: IRoleTable) => void
  refetchData: () => Promise<void> | undefined
}
const UpdateRole = (props: IProp) => {
  const { isUpdateOpen, setIsUpdateOpen, updatedRole, setUpdatedRole, refetchData } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const updateRoleMutation = useUpdateRole()

  const onFinish = async (value: any) => {
    const checkedPermissions = []
    if (value.permissionIds) {
      for (const key in value.permissionIds) {
        if (value.permissionIds[key] === true) {
          checkedPermissions.push(key)
        }
      }
    }
    console.log(value.permissionIds)
    console.log(checkedPermissions)
    const body = {
      id: updatedRole.id,
      roleName: value.roleName,
      permissionId: checkedPermissions,
      description: value.description
    }
    updateRoleMutation.mutate(body as any, {
      onSuccess: async () => {
        await refetchData();
        messageApi.success("Update account successfully");
      },
      onError(error: Error) {
        console.log(error)
        const messageError = onErrorUtil(error)
        messageApi.open({
          type: messageError.type,
          content: messageError.content
        })
      }, onSettled() {
        handleCancel()
      }
    })
  }
  const handleCancel = () => {
    form.resetFields()
    setUpdatedRole({
      id: '',
      roleName: '',
      description: '',
      permissions: []
    })
    setIsUpdateOpen(false)
  }
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
          searchConfig: {
            resetText: 'Cancel',
            submitText: 'Update role'
          },
          submitButtonProps: {
            icon: <PlusOutlined />
          },
          render: (_: any, dom: any) => dom // render mặc định
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
              <ModuleApi form={form} singleRole={updatedRole} openModal={isUpdateOpen} />
            </ProCard>
          </Col>
        </Row>
      </ModalForm>
    </>
  )
}

export default UpdateRole
