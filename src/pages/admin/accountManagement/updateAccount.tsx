/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, FormProps, Input, Modal, Row, Select } from 'antd'
import { useEffect } from 'react'

interface IProp {
  updatedAccount: IAccountTable
  setUpdatedAccount: (value: IAccountTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
const UpdateAccount = (props: IProp) => {
  const { updatedAccount, setUpdatedAccount, isUpdateOpen, setIsUpdateOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<IAccountTable>['onFinish'] = (value) => {
    console.log(value)
    handleCancel()
  }
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    form.resetFields()
    setUpdatedAccount({
      id: '',
      username: '',
      phone: '',
      fullName: '',
      email: '',
      password: '',
      role: 3
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedAccount.id,
      username: updatedAccount.username,
      password: updatedAccount.password,
      email: updatedAccount.email,
      phone: updatedAccount.phone,
      fullName: updatedAccount.fullName,
      role: updatedAccount.role
    })
  }, [updatedAccount])
  return (
    <>
      <>
        <Modal title='Update Account' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
            <Row gutter={16}>
              <Col span={20}>
                <Form.Item<IAccountTable> label='ID' name='id'>
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Form.Item<IAccountTable> label='Email' name='email'>
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Form.Item<IAccountTable>
                  label='Username'
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Please input full name'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={20}>
                <Form.Item<IAccountTable>
                  label='Password'
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Please input full name'
                    }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item<IAccountTable>
                  label='Phone'
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: 'Please input phone'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={10}>
                <Form.Item<IAccountTable>
                  label='Role'
                  name='role'
                  rules={[
                    {
                      required: true,
                      message: 'Please input role'
                    }
                  ]}
                >
                  <Select
                    options={[
                      { value: 'employee', label: 'Employee' },
                      { value: 'admin', label: 'Admin' }
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item<IAccountTable>
                  label='Full name'
                  name='fullName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input full name'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    </>
  )
}
export default UpdateAccount
