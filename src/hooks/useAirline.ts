import airlineApi from '@/apis/airline.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllAirlines = () => {
  return useQuery({
    queryKey: ['airlines'],
    queryFn: airlineApi.getAirlines
  })
}

export const useAirlineGetById = (id: string) => {
  return useQuery({
    queryKey: ['airlines', id],
    queryFn: () => airlineApi.getAirlineById(id)
  })
}

export const useCreateAirline = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: airlineApi.createAirline,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['airlines'] })
    }
  })
}

export const useUpdateAirline = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: airlineApi.updateAirline,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['airlines'] })
    }
  })
}
export const useDeleteAirline = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: airlineApi.deleteAirline,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['airlines'] })
    }
  })
}
