import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'
import { FlightListConfig, FlightList } from '@/globalType/flight.type'

const URL = 'api/flights'

const flightApi = {
  getFlightById: async (params: string) => {
    const res = await http.get<SuccessResponse<IFlightTable>>(URL, { params })
    return res.data
  },
  getFlights: async (params: FlightListConfig) => {
    const res = await http.get<SuccessResponse<FlightList>>(URL, { params })
    return res.data
  },
  getSeats: async (id: string) => {
    const res = await http.get<SuccessResponse<ISeatTable[]>>(`${URL}/seats/${id}`)
    return res.data
  },
  createFlight: async (param: IFlightTable) => {
    const res = await http.post<SuccessResponse<IFlightTable>>(URL, param)
    return res.data
  },
  deleteFlight: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateFlight: async (param: IFlightTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default flightApi
