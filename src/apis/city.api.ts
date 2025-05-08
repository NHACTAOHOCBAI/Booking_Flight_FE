import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'cities'

const cityApi = {
  getCItyById: async (params: string) => {
    const res = await http.get<SuccessResponse<ICityTable>>(URL, { params })
    return res.data
  },
  getCities: async () => {
    const res = await http.get<SuccessResponse<ICityTable[]>>(URL)
    return res.data
  },
  createCity: async (param: ICityTable) => {
    const res = await http.post<SuccessResponse<ICityTable>>(URL, param)
    return res.data
  },
  deleteCity: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateCity: async (param: ICityTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default cityApi
