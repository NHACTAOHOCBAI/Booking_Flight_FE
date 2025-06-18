import { onErrorUtil } from '@/globalType/util.type'
import { useGetAllFlights } from '@/hooks/useFlight'
import { useGetAllSeats } from '@/hooks/useSeat'
import { useUpdateTicket } from '@/hooks/useTicket'
import { Checkbox, Form, FormProps, Input, message, Modal, Select } from 'antd'
import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { AiOutlineIdcard } from 'react-icons/ai'
import { LuScanBarcode } from 'react-icons/lu'
import { MdDriveFileRenameOutline, MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md'
import { PiSeat } from 'react-icons/pi'

interface IProp {
  updatedTicket: ITicketTable
  setUpdatedTicket: (value: ITicketTable) => void
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}
const UpdateTicket = (props: IProp) => {
  const { updatedTicket, setUpdatedTicket, isUpdateOpen, setIsUpdateOpen, refetchData } = props
  const [form] = Form.useForm()

  const [isFlightId, setIsFlightId] = useState(updatedTicket.flightId)

  const [messageApi, contextHolder] = message.useMessage()
  const updateTicketMutation = useUpdateTicket()

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
      flightId: value.flightId,
      seatId: value.seatId,
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
      flightId: '',
      flightCode: '',
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
      id: updatedTicket.id,
      flightId: updatedTicket.flightId,
      flightCode: updatedTicket.flightCode,
      seatId: updatedTicket.seatId,
      seatName: updatedTicket.seatName,
      passengerName: updatedTicket.passengerName,
      passengerPhone: updatedTicket.passengerPhone,
      passengerIDCard: updatedTicket.passengerIDCard,
      passengerEmail: updatedTicket.passengerEmail,
      haveBaggage: updatedTicket.haveBaggage
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedTicket])

  const seatData = useGetAllSeats({}, isUpdateOpen)
  const seatOptions = useMemo(
    () =>
      seatData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.seatName
        }
      }),
    [seatData]
  )

  const handleClick = () => {
    setIsFlightId(form.getFieldValue('flightId'))
  }

  const flightData = useGetAllFlights({}, isUpdateOpen)
  const flightOptions = useMemo(
    () =>
      flightData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.flightCode
        }
      }),
    [flightData]
  )

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
