import { AppContext } from '@/context/app.context'
import { message } from 'antd'
import { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      message.success('Đăng nhập thành công!', 1).then(() => {
        window.location.href = '/'
        // navigate('/')
      })
    }
  }, [isAuthenticated])

  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
