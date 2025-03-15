import type { FormProps } from 'antd';
import { Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
type FieldType = {
    username?: string,
    phone?: string,
    password?: string,
    fullName?: string,
    gender?: string,
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const SignUpPage = () => (
    <>
        <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ecf0f1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Col xs={22} sm={12} xl={7}>
                <div style={{
                    height: "auto",
                    background: "White",
                    padding: 30,
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <div style={{
                        fontSize: 26,
                        fontWeight: "bold"
                    }}> Join Us Today!</div>
                    <div style={{
                        fontSize: 14,
                        marginBottom: 20,
                        marginTop: 10,
                        color: "#95a5a6"
                    }}> Create your free account</div>
                    <Form
                        style={{ width: "100%" }}
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginBottom: 5
                        }}> Email address</div>
                        <Form.Item<FieldType>
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="name@gmail.com" />
                        </Form.Item>

                        <div style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginBottom: 5
                        }}>Password</div>
                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="Enter your password" />
                        </Form.Item>

                        <div style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            marginBottom: 5
                        }}>Full name</div>
                        <Form.Item<FieldType>
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <Input placeholder="Dang Phuc Nguyen" />
                        </Form.Item>
                        <Row gutter={10}>
                            <Col span={14}>
                                <div style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    marginBottom: 5
                                }}>Phone</div>
                                <Form.Item<FieldType>
                                    name="phone"
                                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                                >
                                    <Input placeholder="0838609516" />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <div style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    marginBottom: 5
                                }}>Gender</div>
                                <Form.Item<FieldType>
                                    name="gender"
                                    rules={[{ required: true, message: 'Please input your gender!' }]}
                                >
                                    <Select
                                        options={[
                                            { value: 'male', label: 'Male' },
                                            { value: 'female', label: 'Female' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{
                        fontSize: 14,
                        color: "#95a5a6",
                    }}>  Or continue with  <Button>
                            <GoogleOutlined />
                            Google
                        </Button>
                    </div>
                    <div style={{
                        marginTop: 10,
                        fontSize: 14,
                        color: "#95a5a6",
                    }}> You already had an account?
                        <span style={{
                            fontSize: 14,
                            color: "#3498db",
                            cursor: "pointer"
                        }}>
                            <Link to='/login'>
                                Login here
                            </Link>
                        </span>

                    </div>
                </div>
            </Col>
        </div>
    </>
);

export default SignUpPage;