import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { saveAccessTokenToLS, saveProfileToLS } from '@/apis/auth.api'
import { AppContext } from '@/context/app.context'
import { useContext } from 'react'
import { useGetMyProfile } from '@/hooks/useMyProfile'

const LoginCallbackPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const { refetch } = useGetMyProfile()

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search)
      const token = params.get('token')

      if (token) {
        saveAccessTokenToLS(token)
        setIsAuthenticated(true)

        const profileResult = await refetch()
        saveProfileToLS(profileResult.data?.data as IAccountTable)
        setProfile(profileResult.data?.data as IAccountTable)
        navigate('/')
      } else {
        navigate('/login')
      }
    }

    handleCallback()
  }, [location, navigate, refetch, setIsAuthenticated])

  return <div>Logging in with Google...</div>
}

export default LoginCallbackPage
