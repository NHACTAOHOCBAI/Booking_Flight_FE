import http from '@/utils/http'
import { SuccessResponse } from '@/utils/util.type'

const URL = 'seats'
const seatApi = {
  getSeats: () => {
    return http.get<SuccessResponse<ISeatTable[]>>(URL)
  }
}
export default seatApi
