import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'
import { TicketList } from '@/globalType/ticket.type'
import { ListConfig } from '@/globalType/ListConfig.type'

const URL = 'api/tickets'

const ticketApi = {
  getTicketById: async (params: string) => {
    const res = await http.get<SuccessResponse<ITicketTable>>(URL, { params })
    return res.data
  },
  getTickets: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<TicketList>>(URL, { params })
    return res.data
  },
  createTicket: async (param: ITicketTable) => {
    const res = await http.post<SuccessResponse<ITicketTable>>(URL, param)
    return res.data
  },
  deleteTicket: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateTicket: async (param: ITicketTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default ticketApi
