import http from '@/utils/http'

export const getPlanes = async () => {
  const response = await http.get('planes', {})
  return response.data
}
