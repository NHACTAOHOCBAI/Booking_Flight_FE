import seatApi from '@/apis/seat.api'
import { SeatListConfig } from '@/globalType/seat.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllSeats = (queryConfig: SeatListConfig) => {
  return useQuery({
    queryKey: ['seats', queryConfig],
    queryFn: () => seatApi.getSeats(queryConfig)
  })
}

export const useGetSeatById = (id: string) => {
  return useQuery({
    queryKey: ['seats', id],
    queryFn: () => seatApi.getSeatById(id)
  })
}

export const useCreateSeat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: seatApi.createSeat,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['seats'] })
    }
  })
}

export const useUpdateSeat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: seatApi.updateSeat,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['seats'] })
    }
  })
}
export const useDeleteSeat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: seatApi.deleteSeat,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['seats'] })
    }
  })
}
