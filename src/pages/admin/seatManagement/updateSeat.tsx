/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormProps, Input, InputNumber, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect } from 'react'
import { IoPricetags } from 'react-icons/io5'
import { LuScanBarcode } from 'react-icons/lu'
import { MdOutlineDescription } from 'react-icons/md'
import { PiSeatLight } from 'react-icons/pi'

interface IProp {
  updatedSeat: ISeatTable
  setUpdatedSeat: (value: ISeatTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
const UpdateSeat = (props: IProp) => {
  const { updatedSeat, setUpdatedSeat, isUpdateOpen, setIsUpdateOpen } = props
  const [form] = Form.useForm()
  const onFinish: FormProps<ISeatTable>['onFinish'] = (value) => {
    console.log(value)
    handleCancel()
  }
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    form.resetFields()
    setUpdatedSeat({
      id: '',
      seatCode: '',
      seatName: '',
      description: '',
      price: 0
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedSeat.id,
      seatCode: updatedSeat.seatCode,
      seatName: updatedSeat.seatName,
      price: updatedSeat.price,
      description: updatedSeat.description
    })
  }, [updatedSeat])
  return (
    <>
      <Modal title='Update Seat' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
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
            <Input />
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
            <Input />
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
            <InputNumber addonAfter='%' style={{ width: '100%' }} />
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
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateSeat
