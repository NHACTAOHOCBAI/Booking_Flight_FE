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
    return http.post<SuccessResponse<string>>(URL, id)
  }
}
export default cityApi
