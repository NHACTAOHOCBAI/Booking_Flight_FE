/* eslint-disable react-hooks/exhaustive-deps */
import { Col, DatePicker, Form, FormProps, Input, Modal, Row, Select } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface IProp {
  updatedAccount: IAccountItem
  setUpdatedAccount: (value: IAccountItem) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
interface IUpdateAccountItem {
  _id: string
  username: string
  password: string
  phone: string
  fullName: string
  dob: string
  gender: string
  role: string
}
const UpdateAccount = (props: IProp) => {
  const { updatedAccount, setUpdatedAccount, isUpdateOpen, setIsUpdateOpen } = props
  const [date, setDate] = useState<string>('')
  const [form] = Form.useForm()
  const onFinish: FormProps<IUpdateAccountItem>['onFinish'] = (value) => {
    value.dob = date
    console.log(value)
    handleCancel()
  }
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    setDate('')
    form.resetFields()
    setUpdatedAccount({
      _id: '',
      username: '',
      phone: '',
      fullName: '',
      dob: '',
      gender: '',
      role: '',
      createdAt: '',
      updatedAt: ''
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      _id: updatedAccount._id,
      username: updatedAccount.username,
      password: '',
      phone: updatedAccount.phone,
      fullName: updatedAccount.fullName,
      dob: updatedAccount.dob ? dayjs(updatedAccount.dob) : null,
      gender: updatedAccount.gender,
      role: updatedAccount.role
    })
  }, [updatedAccount])
  return (
    <>
      <>
        <Modal title='Update Account' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item<IUpdateAccountItem> label='ID' name='_id'>
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item<IUpdateAccountItem> label='Email' name='username'>
                  <Input disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item<IUpdateAccountItem> label='Password' name='password'>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item<IUpdateAccountItem>
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
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item<IUpdateAccountItem>
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
              <Col span={7}>
                <Form.Item<IUpdateAccountItem>
                  label='Gender'
                  name='gender'
                  rules={[
                    {
                      required: true,
                      message: 'Please input gender'
                    }
                  ]}
                >
                  <Select
                    options={[
                      { value: 'male', label: 'Male' },
                      { value: 'female', label: 'Female' }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item<IUpdateAccountItem>
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
              <Col span={7}>
                <Form.Item<IUpdateAccountItem>
                  label='Date of birth'
                  name='dob'
                  rules={[
                    {
                      required: true,
                      message: 'Please input date of birth'
                    }
                  ]}
                >
                  <DatePicker
                    format={{
                      format: 'DD-MM-YYYY',
                      type: 'mask'
                    }}
                    onChange={(date) => setDate(date.format('DD/MM/YYYY'))}
                  />
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
