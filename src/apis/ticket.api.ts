import http from '@/utils/http'

export const getTickets = async () => {
  const response = await http.get('tickets', {})
  return response.data
}
