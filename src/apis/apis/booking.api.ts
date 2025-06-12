import http from '@/apis/http'
import { SuccessResponse } from '@/globalType/util.type'

import { CheckPaymentStatusRes, PaymentReq, PaymentRes } from '@/globalType/booking.type'

const URLPAYMENT = 'api/payment'
const URLBOOKING = 'api/booking-flight'

const bookingApi = {
  bookingFlight: async (params: IBookingTable) => {
    const res = await http.post<SuccessResponse<string>>(URLBOOKING, params)
    return res.data
  },
  createPayment: async (params: PaymentReq) => {
    const res = await http.post<SuccessResponse<PaymentRes>>(URLPAYMENT + '/create', params)
    return res.data
  },
  checkPaymentStatus: async (id: string) => {
    const res = await http.get<SuccessResponse<CheckPaymentStatusRes>>(`${URLPAYMENT}/status/${id}`)
    return res.data
  }
}
export default bookingApi
