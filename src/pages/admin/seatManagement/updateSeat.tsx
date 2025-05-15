/* eslint-disable react-hooks/exhaustive-deps */
import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateSeat } from '@/hooks/useSeat'
import { Form, FormProps, Input, InputNumber, message, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import _ from 'lodash'
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

  const [messageApi, contextHolder] = message.useMessage()
  const updateSeatMutation = useUpdateSeat()

  const onFinish: FormProps<ISeatTable>['onFinish'] = async (value) => {
    const initialValue = _.omit(updatedSeat, ['id'])
    const isDirty = !_.isEqual(value, initialValue)
    if (!isDirty) {
      messageApi.open({
        type: 'error',
        content: 'No Field Change'
      })
      return
    }

    const body = {
      id: updatedSeat.id,
      seatName: value.seatName,
      seatCode: value.seatCode,
      price: value.price,
      description: value.description
    }
    updateSeatMutation.mutate(body, {
      onSuccess(data) {
        messageApi.open({
          type: 'success',
          content: data.message
        })
      },
      onError(error: Error) {
        console.log(error)
        const messageError = onErrorUtil(error)
        messageApi.open({
          type: messageError.type,
          content: messageError.content
        })
      },
      onSettled() {
        handleCancel()
      }
    })
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
      {contextHolder}
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
