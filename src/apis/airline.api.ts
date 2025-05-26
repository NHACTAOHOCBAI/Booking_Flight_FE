import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'
import { AirlineList } from '@/globalType/airline.type'
import { ListConfig } from '@/globalType/ListConfig.type'

const URL = 'api/airlines'

const airlineApi = {
  getAirlineById: async (params: string) => {
    const res = await http.get<SuccessResponse<IAirlineTable>>(URL, { params })
    return res.data
  },
  getAirlines: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<AirlineList>>(URL, { params })
    return res.data
  },
  createAirline: async (param: IAirlineTable) => {
    const res = await http.post<SuccessResponse<IAirlineTable>>(URL, param)
    return res.data
  },
  deleteAirline: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateAirline: async (param: IAirlineTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default airlineApi
