import { Col, Form, FormProps, Input, InputNumber, Modal, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'

interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}
const NewSeat = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<INewSeatItem>['onFinish'] = (value) => {
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
      <Modal title='New Seat' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Row gutter={10}>
            <Col span={18}>
              <Form.Item<INewSeatItem>
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
              <Form.Item<INewSeatItem>
                label='Price(%)'
                name='price'
                rules={[
                  {
                    required: true,
                    message: "Please input seat class's price"
                  }
                ]}
              >
                <InputNumber addonAfter='%' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item<INewSeatItem>
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
export default NewSeat
