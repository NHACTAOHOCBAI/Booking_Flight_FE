/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Form, FormProps, Input, InputNumber, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect } from 'react'

interface IProp {
  updatedSeat: ISeatItem
  setUpdatedSeat: (value: ISeatItem) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
const UpdateSeat = (props: IProp) => {
  const { updatedSeat, setUpdatedSeat, isUpdateOpen, setIsUpdateOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<IUpdateSeatItem>['onFinish'] = (value) => {
    console.log(value)
    handleCancel()
  }
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    form.resetFields()
    setUpdatedSeat({
      _id: '',
      name: '',
      price: 0,
      description: ''
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      _id: updatedSeat._id,
      name: updatedSeat.name,
      price: updatedSeat.price,
      description: updatedSeat.description
    })
  }, [updatedSeat])
  return (
    <>
      <Modal title='Update Seat' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<IUpdateSeatItem> label='ID' name='_id'>
            <Input disabled />
          </Form.Item>
          <Row gutter={10}>
            <Col span={18}>
              <Form.Item<IUpdateSeatItem>
                label='Seat class'
                name='name'
                rules={[
                  {
                    required: true,
                    message: "Please input seat class's name"
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<IUpdateSeatItem>
                label='Price'
                name='price'
                rules={[
                  {
                    required: true,
                    message: "Please input seat class's price"
                  }
                ]}
              >
                <InputNumber addonAfter='%' />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<IUpdateSeatItem>
            label='Description'
            name='description'
            rules={[
              {
                required: true,
                message: "Please input seat class's description"
              }
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateSeat
