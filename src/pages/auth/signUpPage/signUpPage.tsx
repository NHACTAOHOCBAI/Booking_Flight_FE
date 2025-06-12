import type { FormProps } from 'antd'
import { Button, Col, Divider, Form, Input, message, Row, Select } from 'antd'
import { GoogleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

import { onErrorUtil } from '@/globalType/util.type'

import { useRegister } from '@/hooks/useAuth'
type FieldType = {
  email?: string
  phone?: string
  password?: string
  fullName?: string
  gender?: string
  username: string
}

const SignUpPage = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()

  const registerMutation = useRegister()

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const body = {
      password: values.password as string,
      email: values.email as string,
      fullName: values.fullName,
      gender: values.gender,
      phone: values.phone,
      roleId: import.meta.env.VITE_ROLE_ID as string
    }
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data.message)
        navigate('/signup/signupSuccess', { replace: true })
      },
      onError: (error) => {
        const messageError = onErrorUtil(error)
        console.log(error)
        messageApi.open({
          type: messageError.type,
          content: messageError.content
        })
      }
    })
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      {contextHolder}
      <div className='w-full h-full bg-gray-100 flex justify-center items-center'>
        <div className='w-full sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-md'>
          <div className='h-auto bg-white p-8 rounded-xl shadow-lg flex flex-col items-center'>
            <div className='text-3xl font-bold'>Join Us Today!</div>
            <div className='text-sm mb-5 mt-2.5 text-gray-500'>Create your free account</div>
            <Form
              className='w-full'
              layout='vertical'
              name='basic'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete='off'
            >
              <div className='text-sm font-bold mb-1'>Email address</div>
              <Form.Item<FieldType> name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input placeholder='name@gmail.com' />
              </Form.Item>

              <div className='text-sm font-bold mb-1'>Password</div>
              <Form.Item<FieldType>
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password placeholder='Enter your password' />
              </Form.Item>

              <div className='text-sm font-bold mb-1'>Full name</div>
              <Form.Item<FieldType> name='fullName' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input placeholder='Dang Phuc Nguyen' />
              </Form.Item>
              <div className='grid grid-cols-10 gap-2'>
                <div className='col-span-6'>
                  <div className='text-sm font-bold mb-1'>Phone</div>
                  <Form.Item<FieldType>
                    name='phone'
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input placeholder='0838609516' />
                  </Form.Item>
                </div>
                <div className='col-span-4'>
                  <div className='text-sm font-bold mb-1'>Gender</div>
                  <Form.Item<FieldType>
                    name='gender'
                    rules={[{ required: true, message: 'Please input your gender!' }]}
                  >
                    <Select
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' }
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item>
                <Button block type='primary' htmlType='submit' disabled={registerMutation.isPending} className='w-full'>
                  Sign up
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <div className='text-sm text-gray-500 flex items-center gap-1'>
              Or continue with
              <Button
                onClick={() => {
                  window.open('http://localhost:8080/oauth2/authorization/google', '_self')
                }}
                className='mx-1'
              >
                <GoogleOutlined />
                Google
              </Button>
            </div>
            <div className='mt-2.5 text-sm text-gray-500'>
              You already had an account ?
              <span className='text-blue-500 cursor-pointer hover:underline'>
                <Link to='/login' className='mx-1'>
                  Login here
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpPage
