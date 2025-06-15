import bookingApi from '@/apis/apis/booking.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

export const useCancelTicket = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (ids: string[]) => bookingApi.cancelTickets(ids),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['my-profile-ticket-purchased', {}] })
    }
  })
}
