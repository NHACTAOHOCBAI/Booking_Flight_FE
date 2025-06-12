import type { FormProps } from 'antd'
import { Button, Checkbox, Divider, Form, Input } from 'antd'
import { ArrowLeftOutlined, GoogleOutlined } from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { isAxiosUnprocessableEntityError } from '@/utils/utils'
import { ErrorResponse } from '@/globalType/util.type'
import { AppContext } from '@/context/app.context'
import { saveAccessTokenToLS, saveProfileToLS } from '@/apis/auth.api'
import { useLogin } from '@/hooks/useAuth'

type FieldType = {
  username?: string
  password?: string
  remember?: string
}

const LoginPage = () => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const [errorLogin, setErrorLogin] = useState(false)
  const navigate = useNavigate()

  const loginMutation = useLogin()
  const { isAuthenticated } = useContext(AppContext)

  useEffect(() => {
    //đã login => redirect to '/'
    if (isAuthenticated) {
      navigate('/')
      // window.location.href = '/'
    }
  }, [])

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const body = { username: values.username as string, password: values.password as string }
    loginMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.account)
        saveProfileToLS(data.data.account)
        saveAccessTokenToLS(data.data.accessToken)
      },
      onError: (error) => {
        console.log(error)
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          setErrorLogin(true)
        }
      }
    })
  }
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans'>
      <div className='w-full sm:w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-md'>
        <div className='bg-white p-8 rounded-xl shadow-lg flex flex-col items-center'>
          <div className='text-3xl font-extrabold text-gray-800 mb-2'>Welcome back</div>
          <div className='text-sm mb-5 mt-2.5 text-gray-500'>Please enter your credentials to login</div>

          <Form
            className='w-full'
            layout='vertical'
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <div
              className={classNames('flex gap-1 text-sm font-bold mb-1', {
                'text-red-500': errorLogin
              })}
            >
              UserName {errorLogin && <div className='text-red-500 pt-1'> *</div>}
            </div>
            <Form.Item<FieldType> name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input placeholder='name' />
            </Form.Item>

            <div
              className={classNames('flex gap-1 text-sm font-bold mb-1', {
                'text-red-500': errorLogin
              })}
            >
              Password{errorLogin && <div className='text-red-500 pt-1'> *</div>}
            </div>
            <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder='Enter your password' />
            </Form.Item>

            <Form.Item>
              <div className='flex justify-between items-center'>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href='#' className='text-blue-600 hover:underline text-sm'>
                  Forgot password?
                </a>
              </div>
            </Form.Item>

            {errorLogin && <div className='text-red-500 mb-4 text-sm'> Wrong username or password</div>}

            <Form.Item>
              <Button block type='primary' htmlType='submit' className='w-full' disabled={isAuthenticated}>
                Log in
              </Button>
            </Form.Item>
          </Form>

          <div className='w-full flex items-start justify-start text-blue-600 hover:underline'>
            <Link to='/' className='flex items-center gap-1 text-sm'>
              <ArrowLeftOutlined />
              <span> Go to HomePage</span>
            </Link>
          </div>

          <Divider className='mt-2' />

          <div className='text-sm text-gray-500 flex items-center gap-2'>
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

          <div className='mt-2 text-sm text-gray-500'>
            Don't have an account ?
            <span className='text-blue-500 cursor-pointer hover:underline'>
              <Link to='/signup' className='mx-1'>
                Sign up here
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
