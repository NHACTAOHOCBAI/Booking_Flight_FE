import { seatOptions } from '@/utils/select';
import { Card, Form, Input, Select } from 'antd';
import { BsFillTicketPerforatedFill } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import { HiOutlineIdentification } from 'react-icons/hi';
import { MdOutlineDriveFileRenameOutline, MdOutlineMail } from 'react-icons/md';
import { PiSeatBold } from 'react-icons/pi';

interface ITicket {
    seatClass: string,
    customerName: string,
    customerPhone: string,
    customerID: string,
    customerEmail: string
}
interface IProp {
    tickets: ITicketTable,
    setTickets: (value: ITicketTable) => void
}
const TicketInformation = (props: IProp) => {
    const { tickets, setTickets } = props;
    console.log(tickets, setTickets)
    return (
        <Card headStyle={{ textAlign: "left" }} variant="borderless" style={{ width: "100%" }}>
            <div style={{ fontWeight: "bold", fontSize: 18, textAlign: "left", marginBottom: 10 }}>
                <BsFillTicketPerforatedFill style={{ width: 25, height: 25, verticalAlign: "middle", marginRight: 5, marginBottom: 3 }} />
                Ticket 1
            </div>
            <Form
                layout="vertical"
                name="basic"
                autoComplete="off"
            >
                <Form.Item<ITicket>
                    label={<div><PiSeatBold style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Seat class</div>}
                    name="seatClass"
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
                        style={{ width: "200px" }}
                    />
                </Form.Item>

                <Form.Item<ITicket>
                    label={<div><MdOutlineDriveFileRenameOutline style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Name</div>}
                    name="customerName"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Enter a name' />
                </Form.Item>
                <Form.Item<ITicket>
                    label={<div><FiPhone style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Phone</div>}
                    name="customerPhone"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Enter a phone' />
                </Form.Item>
                <Form.Item<ITicket>
                    label={<div><MdOutlineMail style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Email</div>}
                    name="customerEmail"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Enter a email' />
                </Form.Item>
                <Form.Item<ITicket>
                    label={<div><HiOutlineIdentification style={{ width: 20, height: 20, verticalAlign: "middle" }} /> Identify card</div>}
                    name="customerID"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder='Enter a ID' />
                </Form.Item>
            </Form>
        </Card>
    )
};

export default TicketInformation;