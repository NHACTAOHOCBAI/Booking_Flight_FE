import { setBookingTicketsList } from '@/redux/features/bookingTicket/bookingTicketsList'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { CloseOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { FormProps } from 'antd/lib'
import { useEffect, useRef, useState } from 'react'
import { BsFillTicketPerforatedFill } from 'react-icons/bs'
import { FiPhone } from 'react-icons/fi'
import { HiOutlineIdentification } from 'react-icons/hi'
import { MdOutlineDriveFileRenameOutline, MdOutlineMail } from 'react-icons/md'

interface TicketInfo {
  seatId: string
  passengerName: string
  passengerPhone: string
  passengerEmail: string
  passengerIDCard: string
  haveBaggage: boolean
}

interface FormValues {
  tickets: TicketInfo[]
}

interface IProp {
  openNotification: (check?: boolean) => void
}

const TicketInformation = ({ openNotification }: IProp) => {
  const dispatch = useAppDispatch()
  const bookingFlight = useAppSelector((state) => state.bookingFlight)
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)

  const [form] = Form.useForm()

  const onFinish: FormProps<FormValues>['onFinish'] = (values) => {
    if (!values.tickets || values.tickets.length === 0) {
      openNotification()
      dispatch(setBookingTicketsList([]))
      return
    }
    openNotification(true)
    const data = values.tickets.map((value) => ({
      passengerName: value.passengerName,
      passengerPhone: value.passengerPhone,
      passengerIDCard: value.passengerIDCard,
      passengerEmail: value.passengerEmail,
      haveBaggage: value.haveBaggage
    }))
    dispatch(setBookingTicketsList(data))
  }

  useEffect(() => {
    const currentTickets = form.getFieldValue('tickets') || []
    if (currentTickets.length > 0) return

    const data = bookingTicketsList.map((value) => ({
      passengerName: value.passengerName,
      passengerPhone: value.passengerPhone,
      passengerEmail: value.passengerEmail,
      passengerIDCard: value.passengerIDCard,
      haveBaggage: value.haveBaggage
    }))
    form.setFieldsValue({ tickets: data })
  }, [bookingTicketsList, form])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addRef = useRef<((defaultValue?: any) => void) | null>(null)
  const [isAddReady, setIsAddReady] = useState(false)

  const passengerNumber = Number(bookingFlight.queryConfig.passengerNumber)
  useEffect(() => {
    if (!addRef.current || !isAddReady) return

    const currentTickets = form.getFieldValue('tickets') || []
    const missing = passengerNumber - currentTickets.length

    if (passengerNumber > 0 && missing > 0) {
      for (let i = 0; i < missing; ++i) {
        addRef.current({
          seatId: bookingFlight.departureFlightDetails?.selectedSeat.seatId || '',
          haveBaggage: false
        })
      }
    }
  }, [isAddReady])
  useEffect(() => {
    if (!addRef.current || !isAddReady) return
    console.log(1111)
    const currentTickets = form.getFieldValue('tickets') || []
    const missing = passengerNumber - currentTickets.length

    if (passengerNumber > 0 && missing > 0) {
      for (let i = 0; i < missing; ++i) {
        addRef.current({
          seatId: bookingFlight.departureFlightDetails?.selectedSeat.seatId || '',
          haveBaggage: false
        })
      }
    }
  }, [passengerNumber, bookingFlight.departureFlightDetails?.selectedSeat.seatId, form, isAddReady])
  console.log(form.getFieldValue('tickets'))
  return (
    <Form
      form={form}
      onFinish={onFinish}
      name='dynamic_form_complex'
      autoComplete='off'
      initialValues={{ tickets: [{ haveBaggage: false }] }}
      layout='vertical'
      className='w-full'
    >
      <Form.List name='tickets'>
        {(fields, { add, remove }) => {
          console.log('Form.List init')
          if (!addRef.current) {
            addRef.current = add
            setIsAddReady(true)
          }
          return (
            <div className='flex flex-col gap-4'>
              {fields.map((field) => (
                <div key={field.key} className='border rounded-lg p-4 shadow-sm bg-white relative'>
                  {!bookingFlight.departureFlightDetails && (
                    <button
                      type='button'
                      className='absolute top-2 right-2 text-gray-400 hover:text-red-500'
                      onClick={() => remove(field.name)}
                    >
                      <CloseOutlined />
                    </button>
                  )}

                  <div className='text-lg font-semibold mb-4 flex items-center'>
                    <BsFillTicketPerforatedFill className='w-5 h-5 mr-2' />
                    {`Ticket ${field.name + 1}`}
                  </div>

                  {/* <Form.Item
                  label={
                    <div className='flex items-center'>
                      <PiSeatBold className='w-5 h-5 mr-2' />
                      Seat class
                    </div>
                  }
                  name={[field.name, 'seatId']}
                  rules={[{ required: true, message: 'Please select a seat class!' }]}
                  className='text-left'
                >
                  <Select showSearch placeholder='Select a seat' optionFilterProp='label' options={seatOptions} />
                </Form.Item> */}

                  <Form.Item
                    label={
                      <div className='flex items-center'>
                        <MdOutlineDriveFileRenameOutline className='w-5 h-5 mr-2' />
                        Name
                      </div>
                    }
                    name={[field.name, 'passengerName']}
                    rules={[{ required: true, message: 'Please input passenger name!' }]}
                    className='text-left'
                  >
                    <Input placeholder='Enter passenger name' />
                  </Form.Item>

                  <Form.Item
                    label={
                      <div className='flex items-center'>
                        <FiPhone className='w-5 h-5 mr-2' />
                        Phone
                      </div>
                    }
                    name={[field.name, 'passengerPhone']}
                    rules={[{ required: true, message: 'Please input passenger phone number!' }]}
                    className='text-left'
                  >
                    <Input placeholder='Enter phone number' />
                  </Form.Item>

                  <Form.Item
                    label={
                      <div className='flex items-center'>
                        <MdOutlineMail className='w-5 h-5 mr-2' />
                        Email
                      </div>
                    }
                    name={[field.name, 'passengerEmail']}
                    rules={[
                      { required: true, message: 'Please input passenger email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                    className='text-left'
                  >
                    <Input placeholder='Enter email address' />
                  </Form.Item>

                  <Form.Item
                    label={
                      <div className='flex items-center'>
                        <HiOutlineIdentification className='w-5 h-5 mr-2' />
                        Identity card
                      </div>
                    }
                    name={[field.name, 'passengerIDCard']}
                    rules={[{ required: true, message: 'Please input passenger ID card!' }]}
                    className='text-left'
                  >
                    <Input placeholder='Enter ID card number' />
                  </Form.Item>

                  <Form.Item name={[field.name, 'haveBaggage']} valuePropName='checked' className='text-left'>
                    <Checkbox>Does passenger have carry-on baggage?</Checkbox>
                  </Form.Item>
                </div>
              ))}

              {/* Button actions */}
              <div className=' gap-2'>
                {Number(bookingFlight.queryConfig.passengerNumber) === 0 && (
                  <Button type='dashed' onClick={() => add()} className='w-full'>
                    + New Ticket
                  </Button>
                )}

                <Button onClick={() => form.submit()} className='mt-3 w-32 bg-blue-500 text-white hover:bg-blue-600'>
                  Save
                </Button>
              </div>
            </div>
          )
        }}
      </Form.List>
    </Form>
  )
}

export default TicketInformation
