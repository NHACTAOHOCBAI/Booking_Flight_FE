/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, FormProps, Input, Modal, Row, Select } from 'antd'
import { useEffect } from 'react'
import { GrUserAdmin } from 'react-icons/gr'
import { MdOutlineDriveFileRenameOutline, MdOutlinePhone } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'
import { TfiEmail } from 'react-icons/tfi'

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
      <Modal width={1050} title='Update Account' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
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
                <Input />
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
                <Input />
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
                <Input />
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
                  <Input />
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
                  <Input />
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
export default UpdateAccount
