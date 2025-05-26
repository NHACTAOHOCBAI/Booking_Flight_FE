import { Navigate } from 'react-router-dom'
import NotPermitted from './NotPermitted'
import { useContext } from 'react'
import { AppContext } from '@/context/app.context'

interface IProps {
  children: React.ReactNode
}

const RoleBaseRoute = (props: IProps) => {
  const { profile } = useContext(AppContext)
  const userRole = profile

  if (userRole !== null) {
    return <>{props.children}</>
  } else {
    return <NotPermitted />
  }
}

const ProtectedRoute = (props: IProps) => {
  const { isAuthenticated } = useContext(AppContext)

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
