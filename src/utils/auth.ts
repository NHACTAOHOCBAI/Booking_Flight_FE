export function saveAccessTokenToLS(token: string) {
  localStorage.setItem('access_token', token)
}

export const getAccessTokenFromLS = () => {
  const data = localStorage.getItem('access_token')
  return data
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const saveProfileToLS = (profile: unknown) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
