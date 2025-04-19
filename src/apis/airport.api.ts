import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'airport'
const airportApi = {
  getAirport: () => {
    return http.get<SuccessResponse<IAirportTable[]>>(URL)
      .then(
        res => res.data
      )
  },
  getAirportById: (id: string) => {
    return http.get<SuccessResponse<IAirportTable[]>>(`${URL}/${id}`)
      .then(
        res => res.data
      )
  }
}
export default airportApi
