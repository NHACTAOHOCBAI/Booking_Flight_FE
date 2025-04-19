import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'flights'
const flightApi = {
  getFlights: () => {
    return http.get<SuccessResponse<IFlightTable[]>>(URL)
      .then(
        res => res.data
      )
  }
}
export default flightApi
