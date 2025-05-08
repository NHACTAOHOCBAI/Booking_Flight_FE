import { Button, Col, DatePicker, Form, FormProps, Input, InputNumber, message, Modal, Row, Select, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { airportOptions, planeOptions, seatOptions } from '@/utils/select'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { SlCalender } from 'react-icons/sl'
import { TbPlaneArrival, TbPlaneDeparture } from 'react-icons/tb'
import { PiAirplaneInFlight } from 'react-icons/pi'
import { LuScanBarcode } from 'react-icons/lu'
import { useUpdateFlight } from '@/hooks/useFlight'
interface IProp {
  isUpdateOpen: boolean
  setIsUpdateOpen: (value: boolean) => void
  updatedFlight: IFlightTable
  setUpdatedFlight: (value: IFlightTable) => void
}
const UpdateFlight = (props: IProp) => {
  const { isUpdateOpen, setIsUpdateOpen, setUpdatedFlight, updatedFlight } = props
  const [form] = Form.useForm()

  const [messageApi, contextHolder] = message.useMessage()
  const updataFlightMutation = useUpdateFlight()

  const onFinish: FormProps<IFlightTable>['onFinish'] = async (value) => {
    //format day time
    value.departureTime = dayjs(value.departureTime).format('HH:mm DD/MM/YYYY')
    value.arrivalTime = dayjs(value.arrivalTime).format('HH:mm DD/MM/YYYY')
    if (value.interAirport) {
      value.interAirport = value.interAirport.map((values) => {
        return {
          airportId: values.airportId,
          arrivalTime: dayjs(values.arrivalTime).format('HH:mm DD/MM/YYYY'),
          departureTime: dayjs(values.departureTime).format('HH:mm DD/MM/YYYY'),
          note: values.note ? values.note : 'nothing'
        }
      })
    }
    value.seat = value.seat ? value.seat : []
    console.log(value)

    //call mutation
    const body = {
      flightCode: value.flightCode,
      planeId: value.planeId,
      departureAirportId: value.departureAirportId,
      arrivalAirportId: value.arrivalAirportId,
      departureTime: value.departureTime,
      arrivalTime: value.arrivalTime,
      originPrice: value.originPrice,
      interAirport: value.interAirport,
      seat: value.seat
    }
    updataFlightMutation.mutate(body, {
      onSuccess(data) {
        messageApi.open({
          type: 'success',
          content: data.message
        })
      },
      onError(error) {
        console.log(error)
        messageApi.open({
          type: 'error',
          content: error.message
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
    // subForm.resetFields();
    setUpdatedFlight({
      id: '',
      flightCode: '',
      planeId: '',
      departureAirportId: '',
      arrivalAirportId: '',
      departureTime: '',
      arrivalTime: '',
      originPrice: 0,
      interAirport: [],
      seat: []
    })
    setIsUpdateOpen(false)
  }
  useEffect(() => {
    form.setFieldsValue({
      id: updatedFlight.id,
      flightCode: updatedFlight.flightCode,
      planeId: updatedFlight.planeId,
      departureAirportId: updatedFlight.departureAirportId,
      arrivalAirportId: updatedFlight.arrivalAirportId,
      departureTime: updatedFlight.departureTime ? dayjs(updatedFlight.departureTime) : null,
      arrivalTime: updatedFlight.arrivalTime ? dayjs(updatedFlight.arrivalTime) : null,
      originPrice: updatedFlight.originPrice,
      interAirport: updatedFlight.interAirport.map((value) => {
        return {
          airportId: value.airportId,
          arrivalTime: value.arrivalTime ? dayjs(value.arrivalTime) : null,
          departureTime: value.departureTime ? dayjs(value.departureTime) : null,
          note: value.note
        }
      }),
      seat: updatedFlight.seat
    })
  }, [form, updatedFlight])
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
                  options={airportOptions}
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
                  options={airportOptions}
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
                      format={{
                        format: 'HH:mm DD/MM/YYYY'
                      }}
                      placeholder='Select departure time'
                      showTime
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
                      format={{
                        format: 'HH:mm DD/MM/YYYY'
                      }}
                      placeholder='Select arrival time'
                      showTime
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item<IFlightTable> label='Intermediate airport'>
                <Form.List name='interAirport'>
                  {(subFields, subOpt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {subFields.map((subField) => (
                        <Space key={subField.key}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <Row gutter={20}>
                              <Col span={7}>
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
                                    placeholder='Airport'
                                    optionFilterProp='label'
                                    options={airportOptions}
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={8}>
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
                                  <DatePicker
                                    format={{
                                      format: 'HH:mm DD/MM/YYYY'
                                    }}
                                    placeholder='Select arrival time'
                                    showTime
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={8}>
                                <Form.Item
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input departure time'
                                    }
                                  ]}
                                  noStyle
                                  name={[subField.name, 'departureTime']}
                                >
                                  <DatePicker
                                    format={{
                                      format: 'HH:mm DD/MM/YYYY'
                                    }}
                                    placeholder='Select departure time'
                                    showTime
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
              <Form.Item<IFlightTable> label=' '>
                <Form.List name='seat'>
                  {(subFields, subOpt) => (
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                      {subFields.map((subField) => (
                        <Space key={subField.key}>
                          <Row gutter={20}>
                            <Col span={12}>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input seat class'
                                  }
                                ]}
                                noStyle
                                name={[subField.name, 'seatId']}
                              >
                                <Select
                                  style={{ width: '100%' }}
                                  showSearch
                                  placeholder='Seat class'
                                  optionFilterProp='label'
                                  options={seatOptions}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input quantity'
                                  }
                                ]}
                                noStyle
                                name={[subField.name, 'quantity']}
                              >
                                <InputNumber
                                  addonAfter='Tickets'
                                  min={0}
                                  style={{ width: '100%' }}
                                  placeholder='Quantity'
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <CloseOutlined
                            onClick={() => {
                              subOpt.remove(subField.name)
                            }}
                          />
                        </Space>
                      ))}
                      <Button type='dashed' onClick={() => subOpt.add()} block>
                        + Add Sub Item
                      </Button>
                    </div>
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
export default UpdateFlight
