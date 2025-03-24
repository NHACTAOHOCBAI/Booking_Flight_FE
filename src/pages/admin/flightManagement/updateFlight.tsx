 
import { Button, Col, DatePicker, Form, FormProps, InputNumber, Modal, Row, Select, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons"
import dayjs from "dayjs";
import { useEffect } from "react";
interface IProp {
    isUpdateOpen: boolean
    setIsUpdateOpen: (value: boolean) => void
    updatedFlight: IUpdateFlightItem
    setUpdatedFlight: (value: IUpdateFlightItem) => void
}
const UpdateFlight = (props: IProp) => {
    const { isUpdateOpen, setIsUpdateOpen, setUpdatedFlight, updatedFlight } = props;
    const [form] = Form.useForm();
    const onFinish: FormProps<IUpdateFlightItem>['onFinish'] = (value) => {
        value.departureTime = dayjs(value.departureTime).format("DD/MM/YYYY HH:mm:ss");
        value.arrivalTime = dayjs(value.arrivalTime).format("DD/MM/YYYY HH:mm:ss");
        value.interAirport = value.interAirport.map((values) => {
            return {
                _id: values._id,
                arrivalTime: dayjs(values.arrivalTime).format("DD/MM/YYYY HH:mm:ss"),
                departureTime: dayjs(values.departureTime).format("DD/MM/YYYY HH:mm:ss"),
            }
        })
        console.log(value)
        handleCancel();
    }
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        // form.resetFields();
        // subForm.resetFields();
        setUpdatedFlight({
            _id: "",
            planeId: "",
            departureId: "",
            arrivalId: "",
            departureTime: "01/01/2000 00:00:00",
            arrivalTime: "01/01/2000 00:00:00",
            price: 0,
            ticket: [],
            interAirport: [],
        })
        setIsUpdateOpen(false);
    };
    useEffect(() => {
        console.log(updatedFlight);
        const interAirport = updatedFlight.interAirport.map((value) => {
            return {
                _id: value._id,
                arrivalTime: value.arrivalTime ? dayjs(value.arrivalTime) : null,
                departureTime: value.departureTime ? dayjs(value.departureTime) : null,
            }
        })
        form.setFieldsValue({
            _id: updatedFlight._id,
            planeId: updatedFlight.planeId,
            departureId: updatedFlight.departureId,
            arrivalId: updatedFlight.arrivalId,
            departureTime: updatedFlight.departureTime ? dayjs(updatedFlight.departureTime) : null,
            arrivalTime: updatedFlight.arrivalTime ? dayjs(updatedFlight.arrivalTime) : null,
            price: updatedFlight.price,
            ticket: updatedFlight.ticket,
            interAirport: interAirport,
        })
    }, [updatedFlight])
    //fake data
    const planes = [
        { _id: "001", plane: "Boeing 747" },
        { _id: "002", plane: "Airbus A320" }
    ]
    const airports = [
        { _id: "SGN", name: "Tan Son Nhat International Airport", city: "Ho Chi Minh City", country: "Vietnam" },
        { _id: "HAN", name: "Noi Bai International Airport", city: "Hanoi", country: "Vietnam" },
        { _id: "DAD", name: "Da Nang International Airport", city: "Da Nang", country: "Vietnam" },
        { _id: "PQC", name: "Phu Quoc International Airport", city: "Phu Quoc", country: "Vietnam" },
        { _id: "CXR", name: "Cam Ranh International Airport", city: "Nha Trang", country: "Vietnam" },
        { _id: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
        { _id: "SIN", name: "Changi Airport", city: "Singapore", country: "Singapore" },
        { _id: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China" },
        { _id: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
        { _id: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" }
    ];
    const seats = [
        { _id: "S001", name: "Economy", price: 200, description: "Basic economy class seat" },
        { _id: "S002", name: "Business", price: 500, description: "Premium business class seat" },
        { _id: "S003", name: "First Class", price: 1000, description: "Luxury first-class seat" }
    ];
    //
    const planeOptions = planes.map((value) => {
        return {
            value: value._id,
            label: value.plane,
        }
    })
    const airportOptions = airports.map((value) => {
        return {
            value: value._id,
            label: value.name,
        }
    })
    const seatOptions = seats.map((value) => {
        return {
            value: value._id,
            label: value.name,
        }
    })
    return (
        <>
            <Modal width={1050} open={isUpdateOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Row gutter={10}>
                        <Col span={14}>
                            <div style={{
                                fontSize: 20,
                                fontWeight: "bold", color: "#95a5a6"
                            }}> Flight information</div>

                            <Form.Item<IUpdateFlightItem>
                                label="Plane"
                                name="planeId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input plane"
                                    }
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a plane"
                                    optionFilterProp="label"
                                    options={planeOptions}
                                />
                            </Form.Item>

                            <Form.Item<IUpdateFlightItem>
                                label="Departure airport"
                                name="departureId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input airport's city"
                                    }
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a departure airport"
                                    optionFilterProp="label"
                                    options={airportOptions}
                                />
                            </Form.Item>

                            <Form.Item<IUpdateFlightItem>
                                label="Arrival airport"
                                name="arrivalId"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input arrival airport"
                                    }
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a arrival airport"
                                    optionFilterProp="label"
                                    options={airportOptions}
                                />
                            </Form.Item>

                            <Row>
                                <Col span={12}>
                                    <Form.Item<IUpdateFlightItem>
                                        label="Departure time"
                                        name="departureTime"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input departure time "
                                            }
                                        ]}
                                    >
                                        <DatePicker
                                            format={{
                                                format: 'DD-MM-YYYY HH:mm:ss',
                                            }}
                                            placeholder="Select departure time"
                                            showTime
                                        />
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item<IUpdateFlightItem>
                                        label="Arrival time"
                                        name="arrivalTime"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input arrival time"
                                            }
                                        ]}
                                    >
                                        <DatePicker
                                            format={{
                                                format: 'DD-MM-YYYY HH:mm:ss',
                                            }}
                                            placeholder="Select arrival time"
                                            showTime
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item<IUpdateFlightItem>
                                label="Intermediate Airport "
                            >
                                <Form.List name="interAirport">
                                    {(subFields, subOpt) => (
                                        <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
                                            {subFields.map((subField) => (
                                                <Space key={subField.key}>
                                                    <Row gutter={10}>
                                                        <Col span={8}>
                                                            <Form.Item
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please input airport"
                                                                    }
                                                                ]}
                                                                noStyle name={[subField.name, '_id']}>
                                                                <Select style={{ width: "100%" }}
                                                                    showSearch
                                                                    placeholder="Airport"
                                                                    optionFilterProp="label"
                                                                    options={airportOptions}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Form.Item
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please input arrival time"
                                                                    }
                                                                ]}
                                                                noStyle name={[subField.name, 'arrivalTime']}>
                                                                <DatePicker
                                                                    format={{
                                                                        format: 'DD-MM-YYYY HH:mm:ss',
                                                                    }}
                                                                    placeholder="Select arrival time"
                                                                    showTime
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Form.Item
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please input departure time"
                                                                    }
                                                                ]}
                                                                noStyle name={[subField.name, 'departureTime']}>
                                                                <DatePicker
                                                                    format={{
                                                                        format: 'DD-MM-YYYY HH:mm:ss',
                                                                    }}
                                                                    placeholder="Select departure time"
                                                                    showTime
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <CloseOutlined
                                                        onClick={() => {
                                                            subOpt.remove(subField.name);
                                                        }}
                                                    />
                                                </Space>
                                            ))}
                                            <Button type="dashed" onClick={() => subOpt.add()} block>
                                                + Add Sub Item
                                            </Button>
                                        </div>
                                    )}
                                </Form.List>
                            </Form.Item>
                        </Col>
                        <Col span={1}>
                            <div style={{ marginLeft: 10, backgroundColor: "#c8d6e5", height: "100%", width: 1.5 }}></div>
                        </Col>
                        <Col span={9}>
                            <div style={{
                                fontSize: 20,
                                fontWeight: "bold", color: "#95a5a6"
                            }}> Manage Tickets</div>
                            <Form.Item<IUpdateFlightItem>
                                label=" "
                            >
                                <Form.List name="ticket">
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
                                                                        message: "Please input seat class"
                                                                    }
                                                                ]}
                                                                noStyle name={[subField.name, 'ticketId']}>
                                                                <Select style={{ width: "100%" }}
                                                                    showSearch
                                                                    placeholder="Seat class"
                                                                    optionFilterProp="label"
                                                                    options={seatOptions}
                                                                />
                                                            </Form.Item>
                                                        </Col>
                                                        <Col span={12}>
                                                            <Form.Item
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "Please input quantity"
                                                                    }
                                                                ]}
                                                                noStyle name={[subField.name, 'quantity']}>
                                                                <InputNumber addonAfter="Tickets" min={0} style={{ width: "100%" }}
                                                                    placeholder="Quantity" />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>
                                                    <CloseOutlined
                                                        onClick={() => {
                                                            subOpt.remove(subField.name);
                                                        }}
                                                    />
                                                </Space>
                                            ))}
                                            <Button type="dashed" onClick={() => subOpt.add()} block>
                                                + Add Sub Item
                                            </Button>
                                        </div>
                                    )}
                                </Form.List>
                            </Form.Item>
                            <Form.Item<IUpdateFlightItem>
                                label="Original price"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input original price"
                                    }
                                ]}
                            >
                                <InputNumber
                                    min={0}
                                    formatter={(value?: string | number) =>
                                        value ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}
                                    parser={(value?: string) => (value ? value.replace(/,/g, "") : "")}
                                    addonAfter="VNĐ" style={{ width: "100%" }} placeholder="Enter price" />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
export default UpdateFlight;