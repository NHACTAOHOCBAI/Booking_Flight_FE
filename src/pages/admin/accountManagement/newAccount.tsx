import { Col, Form, FormProps, Input, Modal, Row, Select } from 'antd'

interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}
const NewAccount = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
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
    setIsNewOpen(false)
  }
  return (
    <>
      <Modal title='New Account' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Row gutter={10}>
            <Col span={14}>
              <Row>
                <Col span={22}>
                  <Form.Item<IAccountTable>
                    label='Email'
                    name='email'
                    rules={[
                      {
                        required: true,
                        message: 'Please input email'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={22}>
                  <Form.Item<IAccountTable>
                    label='Username'
                    name='username'
                    rules={[
                      {
                        required: true,
                        message: 'Please input username'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={10}>
              <Row>
                <Col>
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
              </Row>
              <Row>
                <Col span={24}>
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
                        { value: 'admin', label: 'Admin' },
                        { value: 'client', label: 'Client' }
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={15}>
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
          <Row>
            <Col span={15}>
              <Form.Item<IAccountTable>
                label='Password'
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input password'
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
  )
}
export default NewAccount
