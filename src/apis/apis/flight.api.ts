import http from '@/apis/http'
import { SuccessResponse } from '@/globalType/util.type'
import { FlightList } from '@/globalType/flight.type'
import { ListConfig } from '@/globalType/listConfig.type'

const URL = 'api/flights'

const flightApi = {
  getFlightById: async (params: string) => {
    const res = await http.get<SuccessResponse<IFlightTable>>(`${URL}/${params}`)
    return res.data
  },
  getFlights: async (params: ListConfig | string) => {
    let res
    if (typeof params === 'object') {
      res = await http.get<SuccessResponse<FlightList>>(URL, { params })
    } else {
      res = await http.get<SuccessResponse<FlightList>>(params)
    }
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
