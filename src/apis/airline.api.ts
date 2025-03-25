import http from '@/utils/http'

export const getAirlines = async () => {
  const response = await http.get('airline', {})
  return response.data
}
