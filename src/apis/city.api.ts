import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'cities'

const cityApi = {
  getCities: () => {
    return http.get<SuccessResponse<ICityTable[]>>(URL)
  },
  createCity: (param: ICityTable) => {
    return http.post<SuccessResponse<ICityTable>>(URL, param)
  },
  deleteCity: (id: string) => {
    return http.delete<SuccessResponse<string>>(`${URL}/${id}`)
  },
  updateCity: (param: ICityTable) => {
    return http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
  }
}
export default cityApi
