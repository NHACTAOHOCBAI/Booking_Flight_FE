import airportApi from '@/apis/apis/airport.api'
import { ListConfig } from '@/globalType/listConfig.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllAirports = (queryConfig: ListConfig, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['airports', queryConfig],
    queryFn: () => airportApi.getAirports(queryConfig),
    enabled
  })
}

export const useAirportGetById = (id: string) => {
  return useQuery({
    queryKey: ['airports', id],
    queryFn: () => airportApi.getAirportById(id)
  })
}

export const useCreateAirport = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: airportApi.createAirport,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['airports'] })
    }
  })
}

export const useUpdateAirport = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: airportApi.updateAirport,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['airports'] })
    }
  })
}

export const useDeleteAirport = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: airportApi.deleteAirport,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['airports'] })
    }
  })
}
