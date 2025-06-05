import { Navigate } from 'react-router-dom'
import NotPermitted from './NotPermitted'
import { useContext } from 'react'
import { AppContext } from '@/context/app.context'

interface IProps {
  children: React.ReactNode
}

const RoleBaseRoute = (props: IProps) => {
  const { profile, isPermissionsReady } = useContext(AppContext)
  const userRole = profile?.role?.roleName

  if (userRole && userRole !== 'USER') {
    if (isPermissionsReady) return <>{props.children}</>
    else <Navigate to='/admin' />
  } else {
    return <NotPermitted />
  }
}

const ProtectedRoute = (props: IProps) => {
  const { isAuthenticated } = useContext(AppContext)

  // const isAuthenticated = true
  return (
    <>
      {isAuthenticated === true ? (
        <>
          <RoleBaseRoute>{props.children}</RoleBaseRoute>
        </>
      ) : (
        <Navigate to='/login' replace />
      )}
    </>
  )
}

export default ProtectedRoute
