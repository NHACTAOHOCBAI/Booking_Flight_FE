import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'
import { SeatList, SeatListConfig } from '@/globalType/seat.type'

const URL = 'api/seats'

const seatApi = {
  getSeatById: async (params: string) => {
    const res = await http.get<SuccessResponse<ISeatTable>>(URL, { params })
    return res.data
  },
  getSeats: async (params: SeatListConfig) => {
    const res = await http.get<SuccessResponse<SeatList>>(URL, { params })
    return res.data
  },
  createSeat: async (param: ISeatTable) => {
    const res = await http.post<SuccessResponse<ISeatTable>>(URL, param)
    return res.data
  },
  deleteSeat: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateSeat: async (param: ISeatTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default seatApi
