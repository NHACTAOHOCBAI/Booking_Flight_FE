import { onErrorUtil } from '@/globalType/util.type'
import { useCreateSeat } from '@/hooks/useSeat'
import { Form, FormProps, Input, InputNumber, message, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { IoPricetags } from 'react-icons/io5'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDescription } from 'react-icons/md'
import { PiSeatLight } from 'react-icons/pi'

interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}
const NewSeat = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const newSeatMutation = useCreateSeat()

  const onFinish: FormProps<ISeatTable>['onFinish'] = (value) => {
    const body = {
      seatName: value.seatName,
      seatCode: value.seatCode,
      price: value.price,
      description: value.description
    }
    newSeatMutation.mutate(body, {
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

  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    form.resetFields()
    setIsNewOpen(false)
  }
  return (
    <>
      {contextHolder}
      <Modal title='New Seat' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<ISeatTable>
            label={
              <div>
                <LuScanBarcode />
                Seat code
              </div>
            }
            name='seatCode'
            rules={[
              {
                required: true,
                message: "Please input seat's code"
              }
            ]}
          >
            <Input placeholder='Seat Code' />
          </Form.Item>

          <Form.Item<ISeatTable>
            label={
              <div>
                <PiSeatLight />
                Seat name
              </div>
            }
            name='seatName'
            rules={[
              {
                required: true,
                message: "Please input seat's name"
              }
            ]}
          >
            <Input placeholder='Seat Name' />
          </Form.Item>

          <Form.Item<ISeatTable>
            label={
              <div>
                <IoPricetags />
                Price(%)
              </div>
            }
            name='price'
            rules={[
              {
                required: true,
                message: "Please input seat class's price"
              }
            ]}
          >
            <InputNumber addonAfter='%' style={{ width: '100%' }} placeholder='Seat class price' />
          </Form.Item>

          <Form.Item<ISeatTable>
            label={
              <div>
                <MdOutlineDescription />
                Description
              </div>
            }
            name='description'
            rules={[
              {
                required: true,
                message: "Please input seat class's description"
              }
            ]}
          >
            <TextArea rows={4} placeholder="Seat class's description" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default NewSeat
