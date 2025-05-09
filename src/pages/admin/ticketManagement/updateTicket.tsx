/* eslint-disable react-hooks/exhaustive-deps */
import { onErrorUtil } from '@/globalType/util.type'
import { useCreateTicket } from '@/hooks/useTicket'
import { Checkbox, Form, FormProps, Input, message, Modal } from 'antd'
import { useEffect } from 'react'
import { AiOutlineIdcard } from 'react-icons/ai'
import { LuScanBarcode } from 'react-icons/lu'
import { MdDriveFileRenameOutline, MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md'
import { PiSeat } from 'react-icons/pi'

interface IProp {
  updatedTicket: ITicketTable
  setUpdatedTicket: (value: ITicketTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
}
const UpdateTicket = (props: IProp) => {
  const { updatedTicket, setUpdatedTicket, isUpdateOpen, setIsUpdateOpen } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const updateTicketMutation = useCreateTicket()

  const onFinish: FormProps<ITicketTable>['onFinish'] = async (value) => {
    const body = {
      flightId: value.flightId,
      flightName: value.flightName,
      seatId: value.seatId,
      seatName: value.seatName,
      passengerName: value.passengerName,
      passengerPhone: value.passengerPhone,
      passengerIDCard: value.passengerIDCard,
      passengerEmail: value.passengerEmail,
      haveBaggage: value.haveBaggage
    }
    updateTicketMutation.mutate(body, {
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
    setUpdatedTicket({
      id: '',
      flightId: '',
      flightName: '',
      seatId: '',
      seatName: '',
      passengerName: '',
      passengerPhone: '',
      passengerIDCard: '',
      passengerEmail: '',
      haveBaggage: false
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      flightId: updatedTicket.flightId,
      seatId: updatedTicket.seatId,
      passengerName: updatedTicket.passengerName,
      passengerPhone: updatedTicket.passengerPhone,
      passengerIDCard: updatedTicket.passengerIDCard,
      passengerEmail: updatedTicket.passengerEmail
    })
  }, [updatedTicket])
  return (
    <>
      {contextHolder}
      <Modal title='Update Ticket' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<ITicketTable>
            label={
              <div>
                <LuScanBarcode />
                Flight ID
              </div>
            }
            name='flightId'
            rules={[
              {
                required: true,
                message: "Please input flight's Id"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ITicketTable>
            label={
              <div>
                <PiSeat />
                Seat ID
              </div>
            }
            name='seatId'
            rules={[
              {
                required: true,
                message: "Please input seat's ID"
              }
            ]}
          >
            <Input placeholder='Seat ID' />
          </Form.Item>

          <Form.Item<ITicketTable>
            label={
              <div>
                <MdDriveFileRenameOutline />
                Passenger Name
              </div>
            }
            name='passengerName'
            rules={[
              {
                required: true,
                message: "Please input seat Passenger's Name"
              }
            ]}
          >
            <Input placeholder='Passenger Name' />
          </Form.Item>

          <Form.Item<ITicketTable>
            label={
              <div>
                <AiOutlineIdcard />
                Passenger ID Card
              </div>
            }
            name='passengerIDCard'
            rules={[
              {
                required: true,
                message: "Please input Passenger's ID Card"
              }
            ]}
          >
            <Input placeholder='Passenger ID Card' />
          </Form.Item>

          <Form.Item<ITicketTable>
            label={
              <div>
                <MdOutlineLocalPhone />
                Passenger Phone
              </div>
            }
            name='passengerPhone'
            rules={[
              {
                required: true,
                message: "Please input Passenger's Phone"
              }
            ]}
          >
            <Input placeholder='Passenger Phone' />
          </Form.Item>

          <Form.Item<ITicketTable>
            label={
              <div>
                <MdOutlineMail />
                Passenger Email
              </div>
            }
            name='passengerEmail'
            rules={[
              {
                required: true,
                message: "Please input Passenger's Email"
              }
            ]}
          >
            <Input placeholder='Passenger Email' />
          </Form.Item>

          <Form.Item<ITicketTable> label={null} name='haveBaggage' valuePropName='checked'>
            <Checkbox>Does passenger have carry-on baggage</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default UpdateTicket
