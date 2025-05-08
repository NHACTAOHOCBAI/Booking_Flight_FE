import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'planes'

const planeApi = {
  getPlaneById: async (params: string) => {
    const res = await http.get<SuccessResponse<IPlaneTable>>(URL, { params })
    return res.data
  },
  getPlanes: async () => {
    const res = await http.get<SuccessResponse<IPlaneTable[]>>(URL)
    return res.data
  },
  createPlane: async (param: IPlaneTable) => {
    const res = await http.post<SuccessResponse<IPlaneTable>>(URL, param)
    return res.data
  },
  deletePlane: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updatePlane: async (param: IPlaneTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default planeApi
