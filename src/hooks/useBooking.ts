import bookingApi from '@/apis/apis/booking.api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: bookingApi.createPayment
  })
}

export const useBookingFlight = () => {
  return useMutation({
    mutationFn: bookingApi.bookingFlight
  })
}
export const useCheckPaymentStatus = (id: string) => {
  return useQuery({
    queryKey: ['payments', id],
    queryFn: () => bookingApi.checkPaymentStatus(id)
  })
}
