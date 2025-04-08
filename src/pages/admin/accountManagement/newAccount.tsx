import { Col, Form, FormProps, Input, Modal, Row, Select } from 'antd'
import { MdOutlineDriveFileRenameOutline, MdOutlinePhone } from 'react-icons/md'

import { TfiEmail } from 'react-icons/tfi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { GrUserAdmin } from 'react-icons/gr'
import { useMutation } from '@tanstack/react-query'
import accountApi from '@/apis/account.api'
interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}
const NewAccount = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()

  const loginMutation = useMutation({
    mutationFn: (body: IAccountTable) => accountApi.createAccounts(body)
  })

  const onFinish: FormProps<IAccountTable>['onFinish'] = (value) => {
    loginMutation.mutate(value, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        console.log(error)
      }
    })

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
      <Modal width={1050} title='New Account' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Row gutter={10}>
            <Col span={12}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#95a5a6'
                }}
              >
                Account information
              </div>

              <Form.Item<IAccountTable>
                label={
                  <div>
                    <TfiEmail /> Email
                  </div>
                }
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please input email'
                  }
                ]}
              >
                <Input placeholder='Email' />
              </Form.Item>

              <Form.Item<IAccountTable>
                label={
                  <div>
                    <MdOutlineDriveFileRenameOutline /> Username
                  </div>
                }
                name='username'
                rules={[
                  {
                    required: true,
                    message: 'Please input username'
                  }
                ]}
              >
                <Input placeholder='Username' />
              </Form.Item>

              <Form.Item<IAccountTable>
                label={
                  <div>
                    <RiLockPasswordLine /> Password
                  </div>
                }
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input password'
                  }
                ]}
              >
                <Input placeholder='Password' />
              </Form.Item>
            </Col>
            <Col span={1}>
              <div style={{ marginLeft: 18, backgroundColor: '#c8d6e5', height: '100%', width: 1.5 }}></div>
            </Col>
            <Col span={11}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#95a5a6'
                }}
              >
                Personal information
              </div>
              <Col span={24}>
                <Form.Item<IAccountTable>
                  label={
                    <div>
                      <MdOutlineDriveFileRenameOutline /> Full name
                    </div>
                  }
                  name='fullName'
                  rules={[
                    {
                      required: true,
                      message: 'Please input full name'
                    }
                  ]}
                >
                  <Input placeholder='Full name' />
                </Form.Item>
              </Col>
              <Col span={15}>
                <Form.Item<IAccountTable>
                  label={
                    <div>
                      <MdOutlinePhone /> Phone
                    </div>
                  }
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: 'Please input phone'
                    }
                  ]}
                >
                  <Input placeholder='Phone' />
                </Form.Item>
              </Col>
              <Col span={15}>
                <Form.Item<IAccountTable>
                  label={
                    <div>
                      <GrUserAdmin /> Role
                    </div>
                  }
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
                    placeholder='Role'
                  />
                </Form.Item>
              </Col>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
export default NewAccount
