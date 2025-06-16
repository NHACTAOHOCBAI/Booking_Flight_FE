import { useState } from 'react'
import { Form, Input, Button, message } from 'antd'
import { useResetPassword } from '@/hooks/useAuth'

import useQueryParams from '@/hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const [isChanging, setIsChanging] = useState(false)
  const [form] = Form.useForm()

  //   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/~`]).{8,}$/
  const token = useQueryParams().token
  const navigate = useNavigate()

  const resetPasswordMutation = useResetPassword()
  const onFinish = async (value: { newPassword: string; confirmPassword: string }) => {
    message.destroy()

    const body = {
      newPassword: value.newPassword,
      token: token
    }
    resetPasswordMutation.mutate(body, {
      onSuccess() {
        message.success('Password changed successfully!')
        form.resetFields()
        setTimeout(() => {
          navigate('/', { replace: true })
        }, 500)
      },
      onError(error) {
        console.error('Error changing password:', error)
        message.error('Failed to change password.')
        setIsChanging(false)
      }
    })
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10'>
        <div className='text-center'>
          <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>Change Password</h2>
          <p className='mt-2 text-sm text-gray-600'>Please enter your new password.</p>
        </div>
        <Form form={form} name='change_password_form' onFinish={onFinish} layout='vertical' className='mt-8 space-y-6'>
          <Form.Item
            name='newPassword'
            label='New Password'
            rules={[
              {
                required: true,
                message: 'Please input your new password!'
              },
              {
                min: 6,
                message: 'Password must be at least 8 characters long!'
              },
              {
                // pattern: passwordRegex,
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
              }
            ]}
            hasFeedback
          >
            <Input.Password placeholder='New Password' className='rounded-md' disabled={isChanging} />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            label='Confirm New Password'
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your new password!'
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'))
                }
              })
            ]}
          >
            <Input.Password placeholder='Confirm New Password' className='rounded-md' disabled={isChanging} />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='w-full rounded-md' loading={isChanging} size='large'>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default ResetPassword
