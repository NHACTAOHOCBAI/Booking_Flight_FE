import { useGetMyProfile, useUpdateProfile } from '@/hooks/useMyProfile'
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Form, Input, message, Tabs, UploadFile } from 'antd'
import { useContext, useEffect, useState } from 'react'
import ChangePasswordPage from './changePassword'
import TicketPurchasedPage from './ticketPurchased'
import UploadImage from '@/components/UploadFile'
import { saveProfileToLS } from '@/apis/auth.api'
import { AppContext } from '@/context/app.context'

function MyProfile() {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [isEditingInfo, setIsEditingInfo] = useState(false)
  const [personalInfoForm] = Form.useForm()
  const { setProfile } = useContext(AppContext)

  const { data, refetch } = useGetMyProfile()
  const personalInfo = data?.data
  useEffect(() => {
    personalInfoForm.setFieldsValue(personalInfo)
  }, [personalInfo, personalInfoForm])

  const handleEditInfo = () => {
    setIsEditingInfo(true)
  }
  const { mutate: updateAccountMutation, isPending } = useUpdateProfile()
  const handleSaveInfo = async () => {
    try {
      const value = await personalInfoForm.validateFields()

      const body = {
        account: { email: value.email, fullName: value.fullName, phone: value.phone },
        ...(fileList &&
          fileList.length > 0 && {
            avatar: fileList[0].originFileObj as File
          })
      }
      updateAccountMutation(body, {
        onSuccess(data) {
          setProfile(data.data)
          saveProfileToLS(data.data)
          message.success('Personal information has been saved successfully!')
          setIsEditingInfo(false)
        },
        onError(error: Error) {
          console.log(error)
          message.error('Please check the entered information.')
        }
      })
    } catch (errorInfo) {
      console.log('Validate Failed:', errorInfo)
      message.error('Please check the entered information.')
    }
  }

  const handleCancelEditInfo = () => {
    setIsEditingInfo(false)
    setFileList([])
    personalInfoForm.setFieldsValue(personalInfo)
  }

  const tabItems = [
    {
      key: 'personalInfo',
      label: 'Personal Information',
      children: (
        <Card className='rounded-xl shadow-lg'>
          <div className='p-6'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-1'>Personal Information</h2>
            <p className='mt-1 text-sm text-gray-500 mb-6'>Manage your profile details.</p>
            <Form form={personalInfoForm} layout='vertical' initialValues={personalInfo} onFinish={handleSaveInfo}>
              <div className='flex items-center space-x-4 mb-6'>
                <div className='mb-[10px]'>
                  <UploadImage
                    disabled={!isEditingInfo}
                    isPending={isPending}
                    fileList={fileList}
                    setFileList={setFileList}
                  >
                    <Avatar
                      size={96}
                      src={personalInfo?.avatar as string}
                      icon={<UserOutlined />}
                      className='border-4 border-blue-200 shadow-md'
                    ></Avatar>
                  </UploadImage>
                </div>
              </div>

              <Form.Item label='Full Name' name='fullName'>
                <Input
                  prefix={<UserOutlined />}
                  placeholder='Your full name'
                  readOnly={!isEditingInfo}
                  className={!isEditingInfo ? 'bg-gray-50 text-gray-600' : ''}
                />
              </Form.Item>
              <Form.Item label='Email' name='email'>
                <Input
                  prefix={<MailOutlined />}
                  placeholder='Your email'
                  readOnly={!isEditingInfo}
                  className={!isEditingInfo ? 'bg-gray-50 text-gray-600' : ''}
                />
              </Form.Item>
              <Form.Item label='Phone Number' name='phone'>
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder='Your phone number'
                  readOnly={!isEditingInfo}
                  className={!isEditingInfo ? 'bg-gray-50 text-gray-600' : ''}
                />
              </Form.Item>

              <div className='flex justify-end pt-4 border-t border-gray-200'>
                {isEditingInfo ? (
                  <>
                    <Button onClick={handleCancelEditInfo} className='mr-2'>
                      Cancel
                    </Button>
                    <Button type='primary' htmlType='submit'>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button type='primary' onClick={handleEditInfo}>
                    Edit
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
      label: 'Change Password',
      children: <ChangePasswordPage />
    },
    {
      key: 'IncomingFlightTickets',
      label: 'Incoming Tickets',
      children: <TicketPurchasedPage type='incoming' key={'incoming'} />
    },
    {
      key: 'flownTickets',
      label: 'Flown Tickets',
      children: <TicketPurchasedPage type='flown' key={'flown'} />
    },
    {
      key: 'cancelTickets',
      label: 'Cancel Tickets',
      children: <TicketPurchasedPage type='cancelled' key={'cancelled'} />
    }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 font-sans'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-8 text-center drop-shadow-sm'>My Profile</h1>

        <Tabs
          destroyOnHidden={true}
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
