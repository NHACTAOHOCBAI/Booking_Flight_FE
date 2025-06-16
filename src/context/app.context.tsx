import { AllPermissions, loadPermissions } from '@/hooks/usePermission'
import { getAccessTokenFromLS, getProfileFromLS } from '@/apis/auth.api'

import { createContext, useEffect, useMemo, useState } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: IAccountTable | null
  setProfile: React.Dispatch<React.SetStateAction<IAccountTable | null>>
  PERMISSIONS: {
    permissions: AllPermissions
    isLoading: boolean
    error: Error | null
    refetch: () => void
  }
  isPermissionsReady: boolean
  urlTicket: string[]
  setUrlTicket: React.Dispatch<React.SetStateAction<string[]>>
}
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  PERMISSIONS: {
    permissions: {},
    isLoading: false,
    error: null,
    refetch: () => {}
  },
  isPermissionsReady: false,
  urlTicket: [],
  setUrlTicket: () => null
}
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const [urlTicket, setUrlTicket] = useState(initialAppContext.urlTicket)

  const [PERMISSIONS, setPermissions] = useState(initialAppContext.PERMISSIONS)
  const [isPermissionsReady, setIsPermissionsReady] = useState(false)
  useEffect(() => {
    console.log('re mount')
    loadPermissions().then((permissions) => {
      setPermissions({
        permissions,
        isLoading: false,
        error: null,
        refetch: loadPermissions
      })
      setIsPermissionsReady(true)
    })
    return () => console.log('AppProvider unmounted')
  }, [])
  const contextValue = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
      profile,
      setProfile,
      PERMISSIONS,
      isPermissionsReady,
      urlTicket,
      setUrlTicket
    }
  }, [isAuthenticated, profile, PERMISSIONS, isPermissionsReady, urlTicket])

  return <AppContext.Provider value={contextValue}> {children} </AppContext.Provider>
}
