/* eslint-disable @typescript-eslint/no-explicit-any */
import airportApi from '@/apis/apis/airport.api'
import planeApi from '@/apis/apis/plane.api'
import seatApi from '@/apis/apis/seat.api'
import { onErrorUtil } from '@/globalType/util.type'
import { useCreateFlight } from '@/hooks/useFlight'
import {
  validateSequentialTimes,
  getIntermediateDepartureDisabledTime,
  getIntermediateArrivalDisabledTime
} from '@/utils/validateTime'

import { CloseOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Col, DatePicker, Form, FormProps, Input, InputNumber, message, Modal, Row, Select, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { LuScanBarcode } from 'react-icons/lu'
import { PiAirplaneInFlight } from 'react-icons/pi'
import { SlCalender } from 'react-icons/sl'
import { TbPlaneArrival, TbPlaneDeparture } from 'react-icons/tb'
interface IProp {
  isNewOpen: boolean
  setIsNewOpen: (value: boolean) => void
  refetchData: () => Promise<void> | undefined
}
const NewFlight = (props: IProp) => {
  const { isNewOpen, setIsNewOpen, refetchData } = props
  const [form] = Form.useForm()
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null)
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null)
  const [departureInterDate, setDepartureInterDate] = useState<Dayjs | null>(null)
  const [, setReturnInterDate] = useState<Dayjs | null>(null)

  const [messageApi, contextHolder] = message.useMessage()
  const newFlightMutation = useCreateFlight()
  useEffect(() => {
    // Khi xoá departureTime
    if (!departureDate) {
      form.setFieldsValue({
        arrivalTime: null,
        listFlight_Airport: []
      })
      setReturnDate(null)
      setDepartureInterDate(null)
      setReturnInterDate(null)
      return
    }

    // Khi xoá arrivalTime
    if (!returnDate) {
      form.setFieldsValue({
        listFlight_Airport: []
      })
      setDepartureInterDate(null)
      setReturnInterDate(null)
      return
    }
  }, [departureDate, returnDate, departureInterDate, form])

  const [, setDepartureInterIndex] = useState<number | null>(null)

  const onFinish: FormProps<IFlightTable>['onFinish'] = async (value) => {
    //format day time
    value.departureTime = dayjs(value.departureTime).format('HH:mm DD/MM/YYYY')
    value.arrivalTime = dayjs(value.arrivalTime).format('HH:mm DD/MM/YYYY')
    if (value.listFlight_Airport) {
      value.listFlight_Airport = value.listFlight_Airport.map((values) => {
        return {
          airportId: values.airportId?.value || '',
          arrivalTime: dayjs(values.arrivalTime).format('HH:mm DD/MM/YYYY'),
          departureTime: dayjs(values.departureTime).format('HH:mm DD/MM/YYYY'),
          note: values.note ? values.note : 'nothing'
        }
      })
    }
    value.listFlight_Seat = value.listFlight_Seat ? value.listFlight_Seat : []

    //call mutation
    const body = {
      flightCode: value.flightCode,
      planeId: value.planeId,
      departureAirportId: value.departureAirportId,
      arrivalAirportId: value.arrivalAirportId,
      departureTime: value.departureTime,
      arrivalTime: value.arrivalTime,
      originPrice: value.originPrice,
      listFlight_Airport: value.listFlight_Airport,
      listFlight_Seat: value.listFlight_Seat
    }

    newFlightMutation.mutate(body, {
      onSuccess: async () => {
        await refetchData()
        messageApi.success('Create flight successfully')
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
      // onSettled() {
      //
      // }
    })
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    form.resetFields()
    // subForm.resetFields();
    setIsNewOpen(false)
  }

  const airportData = useQuery({
    queryKey: ['airports'],
    queryFn: () => airportApi.getAirports({}),
    enabled: isNewOpen
  })
  const airportOptions = useMemo(() => {
    return (
      airportData.data?.data.result.map((value, index) => ({
        key: index,
        value: value.id,
        label: value.airportName
      })) ?? []
    )
  }, [airportData])

  const departureAirportId = Form.useWatch('departureAirportId', form)
  const arrivalAirportId = Form.useWatch('arrivalAirportId', form)

  const intermediateAirports = Form.useWatch('listFlight_Airport', form) || []

  const selectedIntermediateAirportIds = intermediateAirports
    .map((item: { airportId?: { value: string } }) => item?.airportId?.value)
    .filter(Boolean)

  const interAirportOptionCheck = airportOptions
    .filter(
      (airport) =>
        airport.value !== departureAirportId &&
        airport.value !== arrivalAirportId &&
        !selectedIntermediateAirportIds.includes(airport.value)
    )
    .map((item) => item.value)

  const selectedDeparture = airportOptions.find((opt) => opt.value === departureAirportId)
  const selectedArrival = airportOptions.find((opt) => opt.value === arrivalAirportId)
  const departureOptions = [
    ...airportOptions.filter(
      (airport) => airport.value !== arrivalAirportId && interAirportOptionCheck.includes(airport.value)
    ),
    ...(selectedDeparture ? [selectedDeparture] : [])
  ]

  const arrivalOptions = [
    ...airportOptions.filter(
      (airport) => airport.value !== departureAirportId && interAirportOptionCheck.includes(airport.value)
    ),
    ...(selectedArrival ? [selectedArrival] : [])
  ]

  const interAirportOptions = airportOptions.filter(
    (airport) =>
      airport.value !== departureAirportId &&
      airport.value !== arrivalAirportId &&
      !selectedIntermediateAirportIds.includes(airport.value)
  )

  const planeData = useQuery({
    queryKey: ['planes'],
    queryFn: () => planeApi.getPlanes({}),
    enabled: isNewOpen
  })
  const planeOptions = useMemo(
    () =>
      planeData.data?.data.result.map((value, index) => {
        return {
          key: index,
          value: value.id,
          label: value.planeName
        }
      }),
    [planeData]
  )

  const seatData = useQuery({
    queryKey: ['seats'],
    queryFn: () => seatApi.getSeats({}),
    enabled: isNewOpen
  })
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
  return (
    <>
      {contextHolder}
      <Modal width={1050} open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form layout='vertical' name='basic' onFinish={onFinish} autoComplete='off' form={form}>
          <Row gutter={10}>
            <Col span={14}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#95a5a6'
                }}
              >
                Flight information
              </div>

              <Form.Item<IFlightTable>
                label={
                  <div>
                    <LuScanBarcode /> Flight code
                  </div>
                }
                name='flightCode'
                rules={[
                  {
                    required: true,
                    message: 'Please input flight code'
                  }
                ]}
              >
                <Input placeholder='Enter a code' />
              </Form.Item>

              <Form.Item<IFlightTable>
                label={
                  <div>
                    <PiAirplaneInFlight /> Plane
                  </div>
                }
                name='planeId'
                rules={[
                  {
                    required: true,
                    message: 'Please input plane'
                  }
                ]}
              >
                <Select showSearch placeholder='Select a plane' optionFilterProp='label' options={planeOptions} />
              </Form.Item>

              <Form.Item<IFlightTable>
                label={
                  <div>
                    <TbPlaneDeparture /> Departure airport
                  </div>
                }
                name='departureAirportId'
                rules={[
                  {
                    required: true,
                    message: "Please input airport's city"
                  }
                ]}
              >
                <Select
                  showSearch
                  placeholder='Select a departure airport'
                  optionFilterProp='label'
                  options={departureOptions}
                />
              </Form.Item>

              <Form.Item<IFlightTable>
                label={
                  <div>
                    <TbPlaneArrival /> Arrival airport
                  </div>
                }
                name='arrivalAirportId'
                rules={[
                  {
                    required: true,
                    message: 'Please input arrival airport'
                  }
                ]}
              >
                <Select
                  showSearch
                  placeholder='Select a arrival airport'
                  optionFilterProp='label'
                  options={arrivalOptions}
                />
              </Form.Item>

              <Row>
                <Col span={12}>
                  <Form.Item<IFlightTable>
                    label={
                      <div>
                        <SlCalender /> Departure time
                      </div>
                    }
                    name='departureTime'
                    rules={[
                      {
                        required: true,
                        message: 'Please input departure time '
                      }
                    ]}
                  >
                    <DatePicker
                      size='large'
                      placeholder='Departure Date'
                      className='w-full'
                      format='DD MMM, YYYY, HH:mm'
                      value={departureDate}
                      onChange={(dateVal: Dayjs | null) => setDepartureDate(dateVal)}
                      disabledDate={(current) => current && current < dayjs().startOf('day')}
                      showTime={{ format: 'HH:mm' }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item<IFlightTable>
                    label={
                      <div>
                        <SlCalender /> Arrival time
                      </div>
                    }
                    name='arrivalTime'
                    rules={[
                      {
                        required: true,
                        message: 'Please input arrival time'
                      }
                    ]}
                  >
                    <DatePicker
                      size='large'
                      placeholder='Arrival Date'
                      className='w-full'
                      format='DD MMM, YYYY, HH:mm'
                      showTime={{ format: 'HH:mm' }}
                      value={returnDate}
                      onChange={(dateVal: Dayjs | null) => setReturnDate(dateVal)}
                      disabled={!departureDate}
                      disabledDate={(current) => {
                        const isBeforeDeparture = departureDate ? current.isBefore(departureDate, 'day') : false

                        return isBeforeDeparture
                      }}
                      disabledTime={(current) => {
                        if (!departureDate || !current) return {}

                        const isSameDay = current.isSame(departureDate, 'day')

                        if (!isSameDay) return {}

                        const depHour = departureDate.hour()
                        const depMinute = departureDate.minute()

                        return {
                          disabledHours: () =>
                            Array.from({ length: 24 }, (_, i) => (i < depHour ? i : -1)).filter((i) => i !== -1),
                          disabledMinutes: (selectedHour) => {
                            if (selectedHour === depHour) {
                              return Array.from({ length: 60 }, (_, i) => (i < depMinute ? i : -1)).filter(
                                (i) => i !== -1
                              )
                            }
                            return []
                          }
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item<IFlightTable> label='Intermediate airport'>
                <Form.List
                  name='listFlight_Airport'
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value || value.length === 0) return Promise.resolve()

                        // Validate sequential times
                        if (!validateSequentialTimes(value)) {
                          return Promise.reject(new Error('Intermediate flights must be in chronological order'))
                        }

                        return Promise.resolve()
                      }
                    }
                  ]}
                >
                  {(subFields, subOpt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {subFields.map((subField) => (
                        <Space key={subField.key}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <Col>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input airport'
                                  }
                                ]}
                                noStyle
                                name={[subField.name, 'airportId']}
                              >
                                <Select
                                  style={{ width: '100%' }}
                                  showSearch
                                  labelInValue
                                  placeholder='Airport'
                                  optionFilterProp='label'
                                  options={interAirportOptions}
                                />
                              </Form.Item>
                            </Col>
                            <Row gutter={20}>
                              <Col>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input departure time'
                                    }
                                  ]}
                                  name={[subField.name, 'departureTime']}
                                >
                                  {/* <DatePicker
                                    size='large'
                                    placeholder='Departure Date'
                                    className='w-full'
                                    format='DD MMM, YYYY, HH:mm'
                                    showTime={{ format: 'HH:mm' }}
                                    onChange={(dateVal: Dayjs | null) => {
                                      setDepartureInterIndex(subField.name)
                                      setDepartureInterDate(dateVal)
                                    }}
                                    disabled={!departureDate || !returnDate}
                                    disabledDate={(current) => {
                                      const isAfterReturnDate = current && current > dayjs(returnDate).startOf('day')
                                      const isBeforeDeparture = current && current < dayjs(departureDate).startOf('day')
                                      return isAfterReturnDate || isBeforeDeparture
                                    }}
                                    disabledTime={(current) => {
                                      if (!departureDate || !current || !returnDate) return {}

                                      const isSameDayAsDeparture = current.isSame(departureDate, 'day')
                                      const isSameDayAsReturn = current.isSame(returnDate, 'day')

                                      const depHour = departureDate.hour()
                                      const depMinute = departureDate.minute()
                                      const returnHour = returnDate.hour()
                                      const returnMinute = returnDate.minute()

                                      return {
                                        disabledHours: () => {
                                          const disabled: number[] = []

                                          if (isSameDayAsDeparture) {
                                            for (let i = 0; i < depHour; i++) disabled.push(i)
                                          }

                                          if (isSameDayAsReturn) {
                                            for (let i = returnHour + 1; i < 24; i++) disabled.push(i)
                                          }

                                          return disabled
                                        },
                                        disabledMinutes: (selectedHour) => {
                                          const disabled: number[] = []

                                          if (isSameDayAsDeparture && selectedHour === depHour) {
                                            for (let i = 0; i < depMinute; i++) disabled.push(i)
                                          }

                                          if (isSameDayAsReturn && selectedHour === returnHour) {
                                            for (let i = returnMinute + 1; i < 60; i++) disabled.push(i)
                                          }

                                          return disabled
                                        }
                                      }
                                    }}
                                  /> */}

                                  <DatePicker
                                    size='large'
                                    placeholder='Departure Date'
                                    className='w-full'
                                    format='DD MMM, YYYY, HH:mm'
                                    showTime={{ format: 'HH:mm' }}
                                    onChange={(dateVal: Dayjs | null) => {
                                      setDepartureInterIndex(subField.name)
                                      setDepartureInterDate(dateVal)

                                      // Reset arrival time của current intermediate
                                      const currentList = form.getFieldValue('listFlight_Airport') || []
                                      const updatedList = currentList.map((item: any, index: number) => {
                                        if (index > subField.name) {
                                          return {
                                            ...item,
                                            departureTime: null,
                                            arrivalTime: null
                                          }
                                        }
                                        return item
                                      })
                                      form.setFieldsValue({ listFlight_Airport: updatedList })
                                    }}
                                    disabled={!departureDate || !returnDate}
                                    disabledDate={(current) => {
                                      // Không được trước main departure
                                      const isBeforeDeparture = current && current < dayjs(departureDate).startOf('day')
                                      // Không được sau main arrival
                                      const isAfterReturn = current && current > dayjs(returnDate).startOf('day')

                                      // Không được trước previous intermediate arrival
                                      const prevInterArrival =
                                        subField.name > 0
                                          ? form.getFieldValue(['listFlight_Airport', subField.name - 1, 'arrivalTime'])
                                          : null
                                      const isBeforePrevArrival =
                                        prevInterArrival && current && current < dayjs(prevInterArrival).startOf('day')

                                      return isBeforeDeparture || isAfterReturn || isBeforePrevArrival
                                    }}
                                    disabledTime={(current) =>
                                      getIntermediateDepartureDisabledTime(
                                        current,
                                        subField.name,
                                        departureDate as Dayjs,
                                        returnDate as Dayjs,
                                        form.getFieldValue('listFlight_Airport') || []
                                      )
                                    }
                                  />
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input arrival time'
                                    }
                                  ]}
                                  noStyle
                                  name={[subField.name, 'arrivalTime']}
                                >
                                  {/* <DatePicker
                                    size='large'
                                    placeholder='Arrival Date'
                                    className='w-full'
                                    format='DD MMM, YYYY, HH:mm'
                                    showTime={{ format: 'HH:mm' }}
                                    value={returnInterDate}
                                    onChange={(dateVal: Dayjs | null) => setReturnInterDate(dateVal)}
                                    disabled={!departureInterDate}
                                    disabledDate={(current) => {
                                      const isAfterReturnDate = current && current > dayjs(returnDate).startOf('day')
                                      const isBeforeDeparture =
                                        current && current < dayjs(departureInterDate).startOf('day')
                                      return isAfterReturnDate || isBeforeDeparture
                                    }}
                                    disabledTime={(current) => {
                                      if (!departureInterDate || !current || !returnDate) return {}

                                      const isSameDayAsDeparture = current.isSame(departureInterDate, 'day')
                                      const isSameDayAsReturn = current.isSame(returnDate, 'day')

                                      const depHour = departureInterDate.hour()
                                      const depMinute = departureInterDate.minute()
                                      const returnHour = returnDate.hour()
                                      const returnMinute = returnDate.minute()

                                      return {
                                        disabledHours: () => {
                                          const disabled: number[] = []

                                          if (isSameDayAsDeparture) {
                                            for (let i = 0; i < depHour; i++) disabled.push(i)
                                          }

                                          if (isSameDayAsReturn) {
                                            for (let i = returnHour + 1; i < 24; i++) disabled.push(i)
                                          }

                                          return disabled
                                        },
                                        disabledMinutes: (selectedHour) => {
                                          const disabled: number[] = []

                                          if (isSameDayAsDeparture && selectedHour === depHour) {
                                            for (let i = 0; i < depMinute; i++) disabled.push(i)
                                          }

                                          if (isSameDayAsReturn && selectedHour === returnHour) {
                                            for (let i = returnMinute + 1; i < 60; i++) disabled.push(i)
                                          }

                                          return disabled
                                        }
                                      }
                                    }}
                                  /> */}

                                  <DatePicker
                                    size='large'
                                    placeholder='Arrival Date'
                                    className='w-full'
                                    format='DD MMM, YYYY, HH:mm'
                                    showTime={{ format: 'HH:mm' }}
                                    onChange={(dateVal: Dayjs | null) => {
                                      setReturnInterDate(dateVal)

                                      // Reset departure time của next intermediate flights
                                      const currentList = form.getFieldValue('listFlight_Airport') || []
                                      const updatedList = currentList.map((item: any, index: number) => {
                                        if (index > subField.name) {
                                          return {
                                            ...item,
                                            departureTime: null,
                                            arrivalTime: null
                                          }
                                        }
                                        return item
                                      })
                                      form.setFieldsValue({ listFlight_Airport: updatedList })
                                    }}
                                    disabled={
                                      !form.getFieldValue(['listFlight_Airport', subField.name, 'departureTime'])
                                    }
                                    disabledDate={(current) => {
                                      const currentDeparture = form.getFieldValue([
                                        'listFlight_Airport',
                                        subField.name,
                                        'departureTime'
                                      ])
                                      if (!currentDeparture) return true

                                      // Không được trước current departure
                                      const isBeforeDeparture =
                                        current && current < dayjs(currentDeparture).startOf('day')
                                      // Không được sau main arrival
                                      const isAfterReturn = current && current > dayjs(returnDate).startOf('day')

                                      return isBeforeDeparture || isAfterReturn
                                    }}
                                    disabledTime={(current) =>
                                      getIntermediateArrivalDisabledTime(
                                        current,
                                        subField.name,
                                        departureDate as Dayjs,
                                        form.getFieldValue('listFlight_Airport') || []
                                      )
                                    }
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={1}>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name)
                                  }}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Form.Item noStyle name={[subField.name, 'note']}>
                                <TextArea rows={3} placeholder='Note: Max length is 250 characters' maxLength={250} />
                              </Form.Item>
                            </Row>
                          </div>
                        </Space>
                      ))}
                      <Button type='dashed' onClick={() => subOpt.add()} block>
                        + Add Sub Item
                      </Button>
                    </div>
                  )}
                </Form.List>
              </Form.Item>
            </Col>
            <Col span={1}>
              <div style={{ marginLeft: 10, backgroundColor: '#c8d6e5', height: '100%', width: 1.5 }}></div>
            </Col>
            <Col span={9}>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#95a5a6'
                }}
              >
                Manage Tickets
              </div>

              <Form.Item label='Seat Class' required>
                <Form.List
                  name='listFlight_Seat'
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value || value.length === 0) {
                          return Promise.reject(new Error('Please input at least one seat class'))
                        }

                        const seatIds = value.map((item: any) => item?.seatId).filter(Boolean)
                        const uniqueSeatIds = new Set(seatIds)

                        if (seatIds.length !== uniqueSeatIds.size) {
                          return Promise.reject(new Error('Seat class must be unique'))
                        }

                        return Promise.resolve()
                      }
                    }
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => {
                        const otherSelectedIds = fields
                          .filter((_, i) => i !== index)
                          .map((f) => form.getFieldValue(['listFlight_Seat', f.name, 'seatId']))
                          .filter(Boolean)

                        const availableOptions =
                          seatOptions?.filter((option) => !otherSelectedIds.includes(option.value)) || []

                        return (
                          <Space key={field.key} align='baseline' style={{ display: 'flex', marginBottom: 8 }}>
                            <Form.Item
                              name={[field.name, 'seatId']}
                              rules={[{ required: true, message: 'Please select seat class' }]}
                            >
                              <Select
                                placeholder='Seat class'
                                options={availableOptions.map((s) => ({
                                  label: s.label,
                                  value: s.value
                                }))}
                                style={{ width: 200 }}
                              />
                            </Form.Item>
                            <Form.Item
                              name={[field.name, 'quantity']}
                              rules={[{ required: true, message: 'Please input quantity' }]}
                            >
                              <InputNumber min={1} placeholder='Quantity' />
                            </Form.Item>
                            <CloseOutlined onClick={() => remove(field.name)} />
                          </Space>
                        )
                      })}

                      <Button
                        type='dashed'
                        onClick={() => add()}
                        block
                        disabled={fields.length >= (seatOptions?.length || 0)}
                      >
                        {fields.length >= (seatOptions?.length || 0) ? 'All seat classes selected' : '+ Add Seat Class'}
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item<IFlightTable>
                label={
                  <div>
                    <AiOutlineDollarCircle
                      style={{
                        width: 17,
                        height: 17
                      }}
                    />
                    Original price
                  </div>
                }
                name='originPrice'
                rules={[
                  {
                    required: true,
                    message: 'Please input original price'
                  }
                ]}
              >
                <InputNumber
                  min={0}
                  formatter={(value?: string | number) =>
                    value ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
                  }
                  parser={(value?: string) => (value ? value.replace(/,/g, '') : '')}
                  addonAfter='VNĐ'
                  style={{ width: '100%' }}
                  placeholder='Enter price'
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
export default NewFlight
