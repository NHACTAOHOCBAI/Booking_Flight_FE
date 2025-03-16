import { Col, DatePicker, Form, FormProps, Input, Modal, Row, Select } from "antd";
import { useState } from "react";

interface IProp {
    isNewOpen: boolean
    setIsNewOpen: (value: boolean) => void
}
const NewAccount = (props: IProp) => {
    const { isNewOpen, setIsNewOpen } = props;
    const [date, setDate] = useState<string>("");
    const [form] = Form.useForm();
    const onFinish: FormProps<INewAccountItem>['onFinish'] = (value) => {
        value.dob = date;
        console.log(value);
        handleCancel();
    }
    const handleOk = () => {
        form.submit();
    };
    const handleCancel = () => {
        setDate("");
        form.resetFields();
        setIsNewOpen(false);
    };
    return (
        <>
            <Modal title="New Account" open={isNewOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item<INewAccountItem>
                                label="Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input email"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item<INewAccountItem>
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input password"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item<INewAccountItem>
                                label="Full name"
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input full name"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={10}>
                            <Form.Item<INewAccountItem>
                                label="Phone"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input phone"
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item<INewAccountItem>
                                label="Gender"
                                name="gender"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input gender"
                                    }
                                ]}
                            >
                                <Select
                                    options={[
                                        { value: 'male', label: 'Male' },
                                        { value: 'female', label: 'Female' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={7}>
                            <Form.Item<INewAccountItem>
                                label="Role"
                                name="role"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input role"
                                    }
                                ]}
                            >
                                <Select
                                    options={[
                                        { value: 'employee', label: 'Employee' },
                                        { value: 'admin', label: 'Admin' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={7}>
                            <Form.Item<INewAccountItem>
                                label="Date of birth"
                                name="dob"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input date of birth"
                                    }
                                ]}
                            >
                                <DatePicker onChange={(date) => setDate(date.format("YYYY-MM-DD"))} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}
export default NewAccount;