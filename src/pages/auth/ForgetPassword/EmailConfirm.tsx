import { useForgetPassword } from '@/hooks/useAuth'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'

const EmailConfirm = () => {
  const [form] = Form.useForm()
  const { mutate: forgetPasswordMutation, isPending } = useForgetPassword()
  const onFinish = (values: { email: string }) => {
    message.destroy()
    const body = {
      email: values.email
    }
    forgetPasswordMutation(body, {
      onSuccess() {
        message.success('A password reset link has been sent to your email. Please check your inbox.')
        form.resetFields()
      },
      onError(error: Error) {
        if (axios.isAxiosError(error)) {
          const message =
            error.response?.data?.message || 'An error occurred while sending the request. Please try again.'
          message.error(message)
        } else {
          message.error('Unexpected error occurred.')
        }
      }
    })
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Reset Password</h2>
          <p className='mt-2 text-sm text-gray-600'>Enter your email address to receive a password reset link.</p>
        </div>
        <Form
          form={form}
          name='reset_password_email_form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout='vertical'
          className='mt-8 space-y-6'
        >
          <Form.Item
            name='email'
            label='Email address'
            rules={[
              {
                required: true,
                message: 'Please input your email address!'
              },
              {
                type: 'email',
                message: 'The input is not a valid E-mail!'
              }
            ]}
          >
            <Input placeholder='Email address' className='rounded-md' disabled={isPending} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full rounded-md' loading={isPending} size='large'>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default EmailConfirm
