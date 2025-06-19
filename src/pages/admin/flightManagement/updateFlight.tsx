/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, DatePicker, Form, FormProps, Input, InputNumber, message, Modal, Row, Select, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { SlCalender } from 'react-icons/sl'
import { TbPlaneArrival, TbPlaneDeparture } from 'react-icons/tb'
import { PiAirplaneInFlight } from 'react-icons/pi'
import { LuScanBarcode } from 'react-icons/lu'
import { useUpdateFlight } from '@/hooks/useFlight'
import { onErrorUtil } from '@/globalType/util.type'
import airportApi from '@/apis/apis/airport.api'
import planeApi from '@/apis/apis/plane.api'
import { useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { validateIntermediateTime } from '@/utils/utils'
import { getIntermediateDepartureDisabledTime, getIntermediateArrivalDisabledTime } from '@/utils/validateTime'

interface IProp {
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  updatedFlight: IFlightTable
  setUpdatedFlight: (value: IFlightTable) => void
  refetchData: () => Promise<void> | undefined
}
const UpdateFlight = (props: IProp) => {
  const { isUpdateOpen, setIsUpdateOpen, setUpdatedFlight, updatedFlight, refetchData } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const updataFlightMutation = useUpdateFlight()

  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null)
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null)
  const [departureInterDate, setDepartureInterDate] = useState<Dayjs | null>(null)
  const [, setReturnInterDate] = useState<Dayjs | null>(null)

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
    value.departureTime = dayjs(value.departureTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
    value.arrivalTime = dayjs(value.arrivalTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY')
    if (value.listFlight_Airport) {
      value.listFlight_Airport = value.listFlight_Airport.map((values) => {
        return {
          id: values.id,
          flightId: values.flightId,
          airportId: values.airportId?.value || values.airportId,
          airportName: values.airportName,
          arrivalTime: dayjs(values.arrivalTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY'),
          departureTime: dayjs(values.departureTime, 'HH:mm DD/MM/YYYY').format('HH:mm DD/MM/YYYY'),
          note: values.note ? values.note : 'nothing'
        }
      })
    } else value.listFlight_Airport = []

    const initialValue = _.omit(updatedFlight, ['id', 'planeName', 'departureAirportName', 'arrivalAirportName'])
    const isDirty = !_.isEqual(value, initialValue)
    if (!isDirty) {
      messageApi.open({
        type: 'error',
        content: 'No Field Change'
      })
      return
    }

    const body = {
      id: updatedFlight.id,
      flightCode: value.flightCode,
      planeId: value.planeId,
      departureAirportId: value.departureAirportId,
      arrivalAirportId: value.arrivalAirportId,
      departureTime: value.departureTime,
      arrivalTime: value.arrivalTime,
      originPrice: value.originPrice,
      listFlight_Airport: value.listFlight_Airport,
      listFlight_Seat: updatedFlight.listFlight_Seat
    }
    updataFlightMutation.mutate(body, {
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

    setUpdatedFlight({
      id: '',
      flightCode: '',
      planeId: '',
      departureAirportId: '',
      arrivalAirportId: '',
      departureTime: '',
      arrivalTime: '',
      originPrice: 0,
      listFlight_Airport: [],
      listFlight_Seat: []
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    setDepartureDate(dayjs(updatedFlight.departureTime, 'HH:mm DD/MM/YYYY'))
    setReturnDate(dayjs(updatedFlight.arrivalTime, 'HH:mm DD/MM/YYYY'))

    form.setFieldsValue({
      planeId: updatedFlight.planeId,
      flightCode: updatedFlight.flightCode,
      planeName: updatedFlight.planeName,
      departureAirportName: updatedFlight.departureAirportName,
      departureAirportId: updatedFlight.departureAirportId,
      arrivalAirportName: updatedFlight.arrivalAirportName,
      arrivalAirportId: updatedFlight.arrivalAirportId,
      departureTime: updatedFlight.departureTime ? dayjs(updatedFlight.departureTime, 'HH:mm DD/MM/YYYY') : null,
      arrivalTime: updatedFlight.arrivalTime ? dayjs(updatedFlight.arrivalTime, 'HH:mm DD/MM/YYYY') : null,
      originPrice: updatedFlight.originPrice,
      listFlight_Airport: updatedFlight.listFlight_Airport.map((value) => {
        return {
          id: value.id,
          airportId: value.airportId,
          airportName: value.airportName,
          flightId: value.flightId,
          arrivalTime: value.arrivalTime ? dayjs(value.arrivalTime, 'HH:mm DD/MM/YYYY') : null,
          departureTime: value.departureTime ? dayjs(value.departureTime, 'HH:mm DD/MM/YYYY') : null,
          note: value.note
        }
      }),
      listFlight_Seat: updatedFlight.listFlight_Seat
    })
  }, [form, updatedFlight])

  const airportData = useQuery({
    queryKey: ['airports'],
    queryFn: () => airportApi.getAirports({}),
    enabled: isUpdateOpen
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
    enabled: isUpdateOpen
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

  return (
    <>
      {contextHolder}
      <Modal width={1050} open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
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
                <Input placeholder='Enter a code' disabled={updatedFlight.hasTicket} />
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
                  disabled={updatedFlight.hasTicket}
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
                  disabled={updatedFlight.hasTicket}
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
                <Form.List name='listFlight_Airport'>
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
                                  name={[subField.name, 'departureTime']}
                                  rules={[
                                    { required: true, message: 'Please input departure time' },
                                    { validator: validateIntermediateTime(form, 'departure') }
                                  ]}
                                >
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
                                  name={[subField.name, 'arrivalTime']}
                                  rules={[
                                    { required: true, message: 'Please input arrival time' },
                                    { validator: validateIntermediateTime(form, 'arrival') }
                                  ]}
                                >
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
                                        returnDate as Dayjs,
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

              {/* <Form.Item label='Seat Class' required>
                <Form.List
                  name='listFlight_Seat'
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (!value || value.length === 0) {
                          return Promise.reject(new Error('Please input at least one seat class'))
                        }

                        const seenSeatIds = new Set()
                        for (const item of value) {
                          if (!item || !item.seatId) {
                            return
                          }
                          if (seenSeatIds.has(item.seatId)) {
                            return Promise.reject(new Error('Seat class must be unique'))
                          }
                          seenSeatIds.add(item.seatId)
                        }

                        return Promise.resolve()
                      }
                    }
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field) => (
                        <Space key={field.key} align='baseline' style={{ display: 'flex', marginBottom: 8 }}>
                          <Form.Item
                            name={[field.name, 'seatId']}
                            rules={[{ required: true, message: 'Please select seat class' }]}
                          >
                            <Select
                              disabled={updatedFlight.hasTicket}
                              placeholder='Seat class'
                              options={seatOptions?.map((s) => ({
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
                            <InputNumber disabled={updatedFlight.hasTicket} min={1} placeholder='Quantity' />
                          </Form.Item>
                          <CloseOutlined onClick={() => remove(field.name)} />
                        </Space>
                      ))}

                      <Button disabled={updatedFlight.hasTicket} type='dashed' onClick={() => add()} block>
                        + Add Seat Class
                      </Button>

                      <Form.ErrorList errors={errors} />
                    </>
                  )}
                </Form.List>
              </Form.Item> */}

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
                  disabled={updatedFlight.hasTicket}
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
export default UpdateFlight
