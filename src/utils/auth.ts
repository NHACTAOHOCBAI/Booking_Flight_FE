export function setLocalStorage(token: string) {
  localStorage.setItem('access_token', token)
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem('access_token')
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const saveProfileToLS = (profile: IAccountTable) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
