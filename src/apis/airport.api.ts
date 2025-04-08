import http from '@/utils/http'
import { SuccessResponse } from '@/utils/util.type'

const URL = 'airport'
const airportApi = {
  getAirport: () => {
    return http.get<SuccessResponse<IAirportTable[]>>(URL)
  }
}
export default airportApi
