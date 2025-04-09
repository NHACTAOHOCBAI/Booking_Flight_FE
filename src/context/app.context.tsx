import { getAccessTokenFromLS, getProfileFromLS } from '@/utils/auth'
import { createContext, useMemo, useState } from 'react'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: string | null
  setProfile: React.Dispatch<React.SetStateAction<string | null>>
}
const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)

  const contextValue = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
      profile,
      setProfile
    }
  }, [profile, isAuthenticated])

  return <AppContext.Provider value={contextValue}> {children} </AppContext.Provider>
}
