import type { FormProps } from 'antd'
import { Button, Checkbox, Col, Divider, Flex, Form, Input } from 'antd'
import { ArrowLeftOutlined, GoogleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const LoginPage = () => (
  <>
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ecf0f1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Col xs={22} sm={12} xl={6}>
        <div
          style={{
            height: 'auto',
            background: 'White',
            padding: 30,
            borderRadius: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 'bold'
            }}
          >
            Welcome back
          </div>
          <div
            style={{
              fontSize: 14,
              marginBottom: 20,
              marginTop: 10,
              color: '#95a5a6'
            }}
          >
            Please enter your credentials to login
          </div>
          <Form
            style={{ width: '100%' }}
            layout='vertical'
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 5
              }}
            >
              Email address
            </div>
            <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder='name@gmail.com' />
            </Form.Item>
            <div
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 5
              }}
            >
              Password
            </div>
            <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder='Enter your password' />
            </Form.Item>

            <Form.Item>
              <Flex justify='space-between' align='center'>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a>Forgot password?</a>
              </Flex>
            </Form.Item>
            <Form.Item>
              <Button block type='primary' htmlType='submit'>
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'left' /* Căn giữa theo chiều dọc */,
              justifyContent: 'flex-start'
            }}
          >
            <Link to='/'>
              <ArrowLeftOutlined />
              <span> Go to homepage</span>
            </Link>
          </div>
          <Divider
            style={{
              marginTop: 10
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: '#95a5a6'
            }}
          >
            Or continue with
            <Button className='mx-1'>
              <GoogleOutlined />
              Google
            </Button>
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              color: '#95a5a6'
            }}
          >
            Don't have an account ?
            <span
              style={{
                fontSize: 14,
                color: '#3498db',
                cursor: 'pointer'
              }}
            >
              <Link to='/signup' className='mx-1'>
                Sign up here
              </Link>
            </span>
          </div>
        </div>
      </Col>
    </div>
  </>
)

export default LoginPage
