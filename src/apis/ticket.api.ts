import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'tickets'
const ticketApi = {
  getTickets: () => {
    return http.get<SuccessResponse<ITicketTable[]>>(URL)
      .then(
        res => res.data
      )
  }
}
export default ticketApi
