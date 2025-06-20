import { MyProfileTicketRes } from '@/globalType/myProfile.type'
import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateTicket } from '@/hooks/useTicket'
import { Checkbox, Form, FormProps, Input, message, Modal } from 'antd'
import _ from 'lodash'
import { useEffect } from 'react'
import { AiOutlineIdcard } from 'react-icons/ai'
import { MdDriveFileRenameOutline, MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface IProp {
  updatedTicket: MyProfileTicketRes
  setUpdatedTicket: (value: MyProfileTicketRes) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}
const UpdateTicket = (props: IProp) => {
  const { updatedTicket, setUpdatedTicket, isUpdateOpen, setIsUpdateOpen, refetchData } = props
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  const updateTicketMutation = useUpdateTicket()
  console.log(updatedTicket)
  const onFinish: FormProps<ITicketTable>['onFinish'] = async (value) => {
    const values = form.getFieldsValue()
    const initialValue = _.omit(updatedTicket, ['id', 'flightCode', 'seatName'])
    const isDirty = !_.isEqual(values, initialValue)
    if (!isDirty) {
      messageApi.open({
        type: 'error',
        content: 'No Field Change'
      })

      return
    }

    const body = {
      id: updatedTicket.id,
      flightId: updatedTicket.flight.id,
      seatId: updatedTicket.seat.id,
      passengerName: value.passengerName,
      passengerPhone: value.passengerPhone,
      passengerIDCard: value.passengerIDCard,
      passengerEmail: value.passengerEmail,
      haveBaggage: value.haveBaggage
    }

    updateTicketMutation.mutate(body, {
      onSuccess: async () => {
        await refetchData()
        messageApi.success('Update account successfully')
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
    setUpdatedTicket({
      id: '',
      flight: {},
      seat: {},
      passengerName: '',
      passengerPhone: '',
      passengerIDCard: '',
      passengerEmail: '',
      urlImage: '',
      ticketStatus: '',
      haveBaggage: false,
      seatNumber: 0
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedTicket.id,
      flightId: updatedTicket.flight ? updatedTicket.flight.id : '',
      flightCode: updatedTicket.flight ? updatedTicket.flight.flightCode : '',
      seatId: updatedTicket.seat.id,
      seatName: updatedTicket.seat.seatName,
      passengerName: updatedTicket.passengerName,
      passengerPhone: updatedTicket.passengerPhone,
      passengerIDCard: updatedTicket.passengerIDCard,
      passengerEmail: updatedTicket.passengerEmail,
      haveBaggage: updatedTicket.haveBaggage,
      seatNumber: updatedTicket.seatNumber
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTicket])

  return (
    <>
      {contextHolder}
      <Modal forceRender title='Update Ticket' open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
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
