/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Form, message, Row } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { onErrorUtil } from '@/globalType/util.type'
import { ModalForm, ProCard, ProFormSwitch, ProFormText } from '@ant-design/pro-components'
import { useCreateRole } from '@/hooks/useRole'
import ModuleApi from './moduleApi'
interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}
const NewRole = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const newRoleMutation = useCreateRole()

  const onFinish = async (value: any) => {
    const checkedPermissions = []
    if (value.permissionId) {
      for (const key in value.permissionId) {
        if (value.permissionId[key] === true) {
          checkedPermissions.push(key)
        }
      }
    }
    console.log(value.permissionId)
    console.log(checkedPermissions)
    const body = {
      roleName: value.roleName,
      permissionId: checkedPermissions,
      description: value.description
    }
    newRoleMutation.mutate(body, {
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
    setIsNewOpen(false)
  }

  return (
    <>
      {contextHolder}
      <ModalForm
        title='New Role'
        open={isNewOpen}
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
            submitText: 'Create new'
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
              <ModuleApi form={form} singleRole={form.getFieldsValue()} openModal={isNewOpen} />
            </ProCard>
          </Col>
        </Row>
      </ModalForm>
    </>
  )
}

export default NewRole
