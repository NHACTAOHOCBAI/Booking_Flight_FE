import http from '@/utils/http'

export const getAirPorts = async () => {
  const response = await http.get('airports', {})
  return response.data
}
