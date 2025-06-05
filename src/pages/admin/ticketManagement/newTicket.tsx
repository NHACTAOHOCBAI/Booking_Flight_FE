import flightApi from '@/apis/apis/flight.api'
import { onErrorUtil } from '@/globalType/util.type'
import { useGetAllFlights } from '@/hooks/useFlight'
import { useGetAllSeats } from '@/hooks/useSeat'
import { useCreateTicket } from '@/hooks/useTicket'
import { useQuery } from '@tanstack/react-query'
import { Checkbox, Form, FormProps, Input, message, Modal, Select } from 'antd'
import { useEffect, useMemo, useState } from 'react'
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

  const [isFlightId, setIsFlightId] = useState('')

  const [messageApi, contextHolder] = message.useMessage()
  const newTicketMutation = useCreateTicket()

  const onFinish: FormProps<ITicketTable>['onFinish'] = async (value) => {
    const body = {
      flightId: value.flightId,
      flightCode: value.flightCode,
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
    setIsFlightId('')
    setIsNewOpen(false)
  }

  const seatData = useGetAllSeats({}, isNewOpen)
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

  const flightData = useGetAllFlights({}, isNewOpen)
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

  useEffect(() => {
    if (seatOptions && seatOptions?.length > 0 && seatData.isFetching === false)
      form.setFieldValue('seatId', seatOptions[0])
  }, [isFlightId, seatData.isFetching])

  return (
    <>
      {contextHolder}
      <Modal forceRender title='New Ticket' open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Form.Item<ITicketTable>
            label={
              <div>
                <LuScanBarcode />
                Flight Code
              </div>
            }
            name='flightId'
            rules={[
              {
                required: true,
                message: "Please input flight's Code"
              }
            ]}
          >
            <Select onChange={handleClick} placeholder='Flight Code' options={flightOptions} />
          </Form.Item>

          <Form.Item<ITicketTable>
            label={
              <div>
                <PiSeat />
                Seat Class
              </div>
            }
            name='seatId'
            rules={[
              {
                required: true,
                message: "Please input seat's Class"
              }
            ]}
          >
            <Select disabled={isFlightId === '' ? true : false} placeholder='Seat class' options={seatOptions} />
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
