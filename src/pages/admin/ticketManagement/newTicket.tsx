import flightApi from '@/apis/flight.api'
import seatApi from '@/apis/seat.api'
import { onErrorUtil } from '@/globalType/util.type'
import { useCreateTicket } from '@/hooks/useTicket'
import { useQuery } from '@tanstack/react-query'
import { Checkbox, Form, FormProps, Input, message, Modal, Select } from 'antd'
import { useMemo } from 'react'
import { AiOutlineIdcard } from 'react-icons/ai'
import { LuScanBarcode } from 'react-icons/lu'
import { MdDriveFileRenameOutline, MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md'
import { PiSeat } from 'react-icons/pi'

interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
}
const NewSeat = (props: IProp) => {
  const { isNewOpen, setIsNewOpen } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const newTicketMutation = useCreateTicket()

  const onFinish: FormProps<ITicketTable>['onFinish'] = async (value) => {
    const body = {
      flightId: value.flightId,
      flightName: value.flightName,
      seatId: value.seatId,
      passengerName: value.passengerName,
      passengerPhone: value.passengerPhone,
      passengerIDCard: value.passengerIDCard,
      passengerEmail: value.passengerEmail,
      haveBaggage: value.haveBaggage
    }
    newTicketMutation.mutate(body, {
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
    setIsNewOpen(false)
  }

  const seatData = useQuery({
    queryKey: ['seats'],
    queryFn: seatApi.getSeats,
    enabled: isNewOpen
  })
  const seatOptions = useMemo(
    () =>
      seatData.data?.data.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.seatName
        }
      }),
    [seatData]
  )
  const flightData = useQuery({
    queryKey: ['flights'],
    queryFn: flightApi.getFlights,
    enabled: isNewOpen
  })
  const flightOptions = useMemo(
    () =>
      flightData.data?.data.map((value, index) => {
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
      <Modal title='New Ticket' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
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
            <Select placeholder='Seat class' options={flightOptions} />
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
            <Select placeholder='Seat class' options={seatOptions} />
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
export default NewSeat
