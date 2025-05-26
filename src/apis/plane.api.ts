import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'
import { PlaneList } from '@/globalType/plane.type'
import { ListConfig } from '@/globalType/ListConfig.type'

const URL = 'api/planes'

const planeApi = {
  getPlaneById: async (params: string) => {
    const res = await http.get<SuccessResponse<IPlaneTable>>(URL, { params })
    return res.data
  },
  getPlanes: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<PlaneList>>(URL, { params })
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
