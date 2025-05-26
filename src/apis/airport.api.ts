import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'
import { AirportList } from '@/globalType/airport.type'
import { ListConfig } from '@/globalType/ListConfig.type'

const URL = 'api/airports'
const airportApi = {
  getAirports: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<AirportList>>(URL, { params })
    return res.data
  },
  getAirportById: async (params: string) => {
    const res = await http.get<SuccessResponse<IAirportTable>>(URL, { params })
    return res.data
  },
  createAirport: async (param: IAirportTable) => {
    const res = await http.post<SuccessResponse<IAirportTable>>(URL, param)
    return res.data
  },
  deleteAirport: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateAirport: async (param: IAirportTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default airportApi
