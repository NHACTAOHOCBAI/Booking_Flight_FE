import { Outlet } from 'react-router-dom'

import Footer from '@/components/Footer'
import UserHeader from './userHeader'

const UserLayout = () => {
  return (
    <div>
      <div className='bg-slate-300 '>
        <UserHeader />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default UserLayout
