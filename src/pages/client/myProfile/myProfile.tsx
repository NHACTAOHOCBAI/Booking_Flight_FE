import { HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons' // For icons
import { Avatar, Button, Card, Form, Input, message, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import ChangePasswordPage from './changePassword'
import TicketPurchasedPage from './ticketPurchased'
import { useGetMyProfile } from '@/hooks/useMyProfile'
import { onErrorUtil } from '@/globalType/util.type'
import { useUpdateAccount } from '@/hooks/useAccount'

function MyProfile() {
  // const [personalInfo, setPersonalInfo] = useState({})

  const [isEditingInfo, setIsEditingInfo] = useState(false)
  const [personalInfoForm] = Form.useForm()

  const personalInfo = useGetMyProfile().data?.data

  useEffect(() => {
    personalInfoForm.setFieldsValue(personalInfo)
  }, [personalInfo, personalInfoForm])

  const handleEditInfo = () => {
    setIsEditingInfo(true)
  }
  const updateAccountMutation = useUpdateAccount()
  const handleSaveInfo = async () => {
    try {
      const value = await personalInfoForm.validateFields()

      const body = {
        id: personalInfo?.id || '',
        email: value.email,
        fullName: value.fullName,
        password: value.password,
        username: value.username,
        roleId: value.role,
        phone: value.phone
      }
      updateAccountMutation.mutate(body, {
        onSuccess() {
          message.success('Update success')
        },
        onError(error: Error) {
          console.log(error)
          message.error('Update error')
        }
      })

      setIsEditingInfo(false)
      message.success('Thông tin cá nhân đã được lưu thành công!')
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo)
      message.error('Vui lòng kiểm tra lại thông tin đã nhập.')
    }
  }

  const handleCancelEditInfo = () => {
    setIsEditingInfo(false)
    personalInfoForm.setFieldsValue(personalInfo)
  }

  const tabItems = [
    {
      key: 'personalInfo',
      label: 'Thông tin cá nhân',
      children: (
        <Card className='rounded-xl shadow-lg'>
          <div className='p-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-1'>Thông tin cá nhân</h2>
            <p className='mt-1 text-sm text-gray-500 mb-6'>Quản lý thông tin hồ sơ của bạn.</p>
            <Form form={personalInfoForm} layout='vertical' initialValues={personalInfo} onFinish={handleSaveInfo}>
              <div className='flex items-center space-x-4 mb-6'>
                <Avatar
                  size={96}
                  src={personalInfoForm.getFieldValue('avatar')}
                  icon={<UserOutlined />}
                  className='border-4 border-blue-200 shadow-md'
                />
                <Form.Item
                  label='URL Ảnh đại diện'
                  name='avatar'
                  className='flex-grow'
                  rules={[{ required: true, message: 'Vui lòng nhập URL ảnh đại diện!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder='Nhập URL ảnh đại diện'
                    readOnly={!isEditingInfo}
                    className={!isEditingInfo ? 'bg-gray-50 text-gray-600' : ''}
                  />
                </Form.Item>
              </div>

              <Form.Item
                label='Họ và Tên'
                name='fullName'
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder='Họ và tên của bạn'
                  readOnly={!isEditingInfo}
                  className={!isEditingInfo ? 'bg-gray-50 text-gray-600' : ''}
                />
              </Form.Item>
              <Form.Item
                label='Email'
                name='email'
                rules={[{ required: true, message: 'Vui lòng nhập email!', type: 'email' }]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder='Email của bạn'
                  readOnly={!isEditingInfo}
                  className={!isEditingInfo ? 'bg-gray-50 text-gray-600' : ''}
                />
              </Form.Item>
              <Form.Item
                label='Số điện thoại'
                name='phone'
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder='Số điện thoại của bạn'
                  readOnly={!isEditingInfo}
                  className={!isEditingInfo ? 'bg-gray-50 text-gray-600' : ''}
                />
              </Form.Item>

              <div className='flex justify-end pt-4 border-t border-gray-200'>
                {isEditingInfo ? (
                  <>
                    <Button onClick={handleCancelEditInfo} className='mr-2'>
                      Hủy
                    </Button>
                    <Button type='primary' htmlType='submit'>
                      Lưu thay đổi
                    </Button>
                  </>
                ) : (
                  <Button type='primary' onClick={handleEditInfo}>
                    Chỉnh sửa
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Card>
      )
    },
    {
      key: 'changePassword',
      label: 'Đổi mật khẩu',
      children: <ChangePasswordPage />
    },
    {
      key: 'purchasedTickets',
      label: 'Vé đã mua',
      children: <TicketPurchasedPage />
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-sans'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-8 text-center drop-shadow-sm'>Hồ Sơ Cá Nhân</h1>

        <Tabs
          defaultActiveKey='personalInfo'
          items={tabItems}
          className='w-full'
          tabBarStyle={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '8px',
            marginBottom: '24px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)'
          }}
        />
      </div>
    </div>
  )
}

export default MyProfile
