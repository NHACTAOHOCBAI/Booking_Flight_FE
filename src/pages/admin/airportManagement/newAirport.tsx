 
import { useCreateAirport } from '@/hooks/useAirport'
import { Form, FormProps, Input, message, Modal, notification } from 'antd'
import { useState } from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}

const NewAirport = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()
  const createAirport = useCreateAirport()
  const [messageApi, messContextHolder] = message.useMessage()
  const [api, notifiContextHolder] = notification.useNotification()
  const [isLoading, setIsloading] = useState(false)
  const onFinish: FormProps<INewAirportItem>['onFinish'] = async (value) => {
    setIsloading(true)
    createAirport.mutate(value, {
      onSuccess: () => {
        messageApi.success('You have created an airport')
        handleCancel()
        setIsloading(false)
      },
      onError: () => {
        api.info({
          message: <div style={{ color: '#ee5253', fontWeight: 'bold' }}>Create failed</div>,
          description: `${createAirport.error?.response.data.message}  `,
          icon: <ExclamationCircleOutlined style={{ color: '#ee5253' }} />
        })
        handleCancel()
        setIsloading(false)
      }
    })
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
      {messContextHolder}
      {notifiContextHolder}
      <Modal
        title='New Airport'
        loading={isLoading} // Sử dụng trực tiếp trạng thái của useMutation
        open={isNewOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<INewAirportItem>
            label='Airport'
            name='name'
            rules={[{ required: true, message: "Please input airport's name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<INewAirportItem>
            label='City'
            name='city'
            rules={[{ required: true, message: "Please input airport's city" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<INewAirportItem>
            label='Country'
            name='country'
            rules={[{ required: true, message: "Please input airport's country" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default NewAirport
