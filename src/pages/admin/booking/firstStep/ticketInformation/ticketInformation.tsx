import { seatOptions } from '@/utils/select';
import { Card, Form, Input, Row, Select } from 'antd';
import { BsFillTicketPerforatedFill } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineIdentification } from 'react-icons/hi';
import { MdOutlineDriveFileRenameOutline, MdOutlineMail } from 'react-icons/md';
import { PiSeatBold } from 'react-icons/pi';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FormProps } from 'antd/lib';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setBookingTicketsList } from '@/redux/features/bookingTicket/bookingTicketsList';
interface TicketInfo {
    seatId: string;
    passengerName: string;
    passengerPhone: string;
    passengerEmail: string;
    passengerIDCard: string;
}

interface FormValues {
    tickets: TicketInfo[];
}
const TicketInformation = () => {
    const dispatch = useAppDispatch();
    const bookingFlight = useAppSelector(state => state.bookingFlight);
    const [form] = Form.useForm();
    const onFinish: FormProps<FormValues>['onFinish'] = (values) => {
        const data: ITicketTable[] = values.tickets.map((value: TicketInfo) => {
            return {
                flightId: bookingFlight.id,
                seatId: value.seatId,
                passengerName: value.passengerName,
                passengerPhone: value.passengerPhone,
                passengerIDCard: value.passengerIDCard,
                passengerEmail: value.passengerEmail
            }
        })
        dispatch(setBookingTicketsList(data));
        console.log(values);
    };
    return (
        <Form
            style={{ width: "100%" }}
            form={form}
            onFinish={onFinish}
            name="dynamic_form_complex"
            autoComplete="off"
            initialValues={{ tickets: [{}] }}
            layout="vertical"
        >
            <Form.List name="tickets">
                {(fields, { add, remove }) => (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field) => (
                            <Card
                                size="small"
                                key={field.key}
                                extra={
                                    <CloseOutlined
                                        onClick={() => {
                                            remove(field.name);
                                        }}
                                    />
                                }
                            >
                                <div style={{ fontWeight: "bold", fontSize: 18, textAlign: "left", marginBottom: 10 }}>
                                    <BsFillTicketPerforatedFill style={{ width: 25, height: 25, verticalAlign: "middle", marginRight: 5, marginBottom: 3 }} />
                                    {`Ticket ${field.name + 1}`}
                                </div>
                                <Form.Item
                                    label={<div><PiSeatBold style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Seat class</div>}
                                    name={[field.name, 'seatId']}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input ticket rank"
                                        }
                                    ]}
                                    style={{ textAlign: "left" }}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Select a seat"
                                        optionFilterProp="label"
                                        options={seatOptions}

                                    />
                                </Form.Item>
                                <Form.Item
                                    label={<div><MdOutlineDriveFileRenameOutline style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Name</div>}
                                    name={[field.name, 'passengerName']}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                    style={{ textAlign: "left" }}
                                >
                                    <Input placeholder='Enter a name' />
                                </Form.Item>
                                <Form.Item
                                    label={<div><FiPhone style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Phone</div>}
                                    name={[field.name, 'passengerPhone']}
                                    rules={[{ required: true, message: 'Please input your phone!' }]}
                                    style={{ textAlign: "left" }}
                                >
                                    <Input placeholder='Enter a phone' />
                                </Form.Item>
                                <Form.Item
                                    label={<div><MdOutlineMail style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Email</div>}
                                    name={[field.name, 'passengerEmail']}
                                    rules={[{ required: true, message: 'Please input your email!' }]}
                                    style={{ textAlign: "left" }}
                                >
                                    <Input placeholder='Enter a email' />
                                </Form.Item>
                                <Form.Item
                                    label={<div><HiOutlineIdentification style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Identify card</div>}
                                    name={[field.name, 'passengerIDCard']}
                                    rules={[{ required: true, message: 'Please input your ID card!' }]}
                                    style={{ textAlign: "left" }}
                                >
                                    <Input placeholder='Enter a ID' />
                                </Form.Item>

                            </Card>
                        ))}
                        <Row justify="end" style={{ gap: 10 }}>
                            <Button type="dashed"
                                style={{ width: 120 }}
                                onClick={() => add()} block>
                                + New Ticket
                            </Button>
                            <Button style={{ width: 120, backgroundColor: "#3498db", color: "white" }} onClick={() => form.submit()}>Save</Button>
                        </Row>
                    </div>
                )}
            </Form.List>
        </Form>
    );
};

export default TicketInformation;