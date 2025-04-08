import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'seats'
const seatApi = {
  getSeats: () => {
    return http.get<SuccessResponse<ISeatTable[]>>(URL)
  }
}
export default seatApi
