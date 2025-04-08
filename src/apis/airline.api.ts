import http from '@/utils/http'
import { SuccessResponse } from '@/utils/util.type'

const URL = 'airline'
const airlineApi = {
  getAirline: () => {
    return http.get<SuccessResponse<IAirlineTable[]>>(URL)
  }
}
export default airlineApi
