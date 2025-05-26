import { AllPermissions, usePermissions } from '@/hooks/usePermission'
import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth'

import { createContext, useMemo, useState } from 'react'

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
  }
}
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const PERMISSIONS = usePermissions()
  const contextValue = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
      profile,
      setProfile,
      PERMISSIONS
    }
  }, [isAuthenticated, profile, PERMISSIONS])

  return <AppContext.Provider value={contextValue}> {children} </AppContext.Provider>
}
