import { Avatar, Badge, Descriptions, DescriptionsProps, Drawer } from 'antd'
import { UserOutlined } from '@ant-design/icons'
interface IProps {
  detailAccount: IAccountTable
  setDetailAccount: (value: IAccountTable) => void
  isDetailOpen: boolean
  setIsDetailOpen: (open: boolean) => void
}
const DetailAccount = (props: IProps) => {
  const { detailAccount, isDetailOpen, setIsDetailOpen, setDetailAccount } = props
  const handleClose = () => {
    setIsDetailOpen(false)
    setDetailAccount({
      id: '',
      email: '',
      fullName: '',
      password: '',
      phone: '',
      role: 3,
      username: ''
    })
  }
  const accountItems: DescriptionsProps['items'] = [
    {
      key: '_id',
      label: 'ID',
      span: 3,
      children: detailAccount?.id
    },
    {
      key: 'username',
      label: 'Username',
      span: 1,
      children: detailAccount?.username
    },
    {
      key: 'email',
      label: 'Email',
      span: 3,
      children: detailAccount?.email
    },
    {
      key: 'role',
      label: 'Role',
      span: 1,
      children: <Badge status='processing' text={`${detailAccount?.role}`} />
    }
  ]
  const personalItems: DescriptionsProps['items'] = [
    {
      key: 'fullname',
      label: 'Full Name',
      span: 2,
      children: detailAccount?.fullName
    },
    {
      key: 'avatar',
      label: 'Avatar',
      span: 2,
      children: <Avatar icon={<UserOutlined />} size={'large'} />
    },
    {
      key: 'phone',
      label: 'Phone',
      children: detailAccount?.phone
    }
  ]
  return (
    <>
      <Drawer title='Account Information' onClose={handleClose} open={isDetailOpen} size='large'>
        <Descriptions size='middle' title='Account Info' column={4} bordered items={accountItems} />
        <Descriptions size='middle' title='Personal Info' bordered items={personalItems} />
      </Drawer>
    </>
  )
}
export default DetailAccount
