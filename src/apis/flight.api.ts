import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'flights'
const flightApi = {
  getFlights: () => {
    return http.get<SuccessResponse<IFlightTable[]>>(URL)
  }
}
export default flightApi
