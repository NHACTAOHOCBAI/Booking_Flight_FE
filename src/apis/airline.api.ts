import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'airline'
const airlineApi = {
  getAirline: () => {
    return http.get<SuccessResponse<IAirlineTable[]>>(URL)
      .then(
        res => res.data
      )
  }
}
export default airlineApi
