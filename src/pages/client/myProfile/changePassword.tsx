import { useUpdatePassword } from '@/hooks/useMyProfile'
import { LockOutlined } from '@ant-design/icons'
import { Button, Card, Form, Input, message } from 'antd'

function ChangePasswordPage() {
  const [passwordForm] = Form.useForm()
  const updatePasswordMutation = useUpdatePassword()
  const handleChangePassword = async () => {
    try {
      const values = await passwordForm.validateFields()
      const body = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword
      }
      updatePasswordMutation.mutate(body, {
        onSuccess() {
          message.success('Password changed successfully!')
        },
        onError(error: Error) {
          console.log(error)
          message.error('Update error')
        }
      })

      passwordForm.resetFields()
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo)
      message.error('Please fill in all password fields correctly.')
    }
  }

  return (
    <Card className='rounded-xl shadow-lg'>
      <div className='p-6'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-1'>Change Password</h2>
        <p className='mt-1 text-sm text-gray-500 mb-6'>Update your password.</p>
        <Form form={passwordForm} layout='vertical' onFinish={handleChangePassword}>
          <Form.Item
            label='Old Password'
            name='oldPassword'
            rules={[{ required: true, message: 'Please enter your old password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Enter your old password' />
          </Form.Item>
          <Form.Item
            label='New Password'
            name='newPassword'
            rules={[
              { required: true, message: 'Please enter your new password!' },
              { min: 6, message: 'New password must be at least 6 characters long.' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Enter new password' />
          </Form.Item>
          <Form.Item
            label='Confirm New Password'
            name='confirmNewPassword'
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The new password and confirmation do not match!'))
                }
              })
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder='Confirm your new password' />
          </Form.Item>
          <div className='flex justify-end pt-4 border-t border-gray-200'>
            <Button type='primary' htmlType='submit'>
              Change Password
            </Button>
          </div>
        </Form>
      </div>
    </Card>
  )
}

export default ChangePasswordPage
