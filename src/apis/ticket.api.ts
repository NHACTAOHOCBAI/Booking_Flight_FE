import http from '@/utils/http'
import { SuccessResponse } from '@/utils/util.type'

const URL = 'tickets'
const ticketApi = {
  getTickets: () => {
    return http.get<SuccessResponse<ITicketTable[]>>(URL)
  }
}
export default ticketApi
