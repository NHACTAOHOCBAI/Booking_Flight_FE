import http from '@/utils/http'

export const getSeat = async () => {
  const response = await http.get('seats', {})
  return response.data
}
