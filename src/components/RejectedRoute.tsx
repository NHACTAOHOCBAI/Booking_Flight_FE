import { AppContext } from '@/context/app.context'
import { useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  console.log(isAuthenticated)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
