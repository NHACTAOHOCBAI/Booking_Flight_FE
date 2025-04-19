import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'cities'

const cityApi = {
  getCities: () => {
    return http.get<SuccessResponse<ICityTable[]>>(URL)
      .then(
        res => res.data
      )
  },
  createCity: (param: ICityTable) => {
    return http.post<SuccessResponse<ICityTable>>(URL, param)
      .then(
        res => res.data
      )
  },
  deleteCity: (id: string) => {
    return http.delete<SuccessResponse<string>>(`${URL}/${id}`)
      .then(
        res => res.data
      )
  },
  updateCity: (param: ICityTable) => {
    return http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
      .then(
        res => res.data
      )
  }
}
export default cityApi
