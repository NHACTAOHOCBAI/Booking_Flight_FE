import { Outlet } from 'react-router-dom'
import UserHeader from 'pages/client/userLayout/userHeader'
import Footer from '@/components/Footer'

const UserLayout = () => {
  return (
    <div>
      <div className='layout '>
        <UserHeader />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default UserLayout
