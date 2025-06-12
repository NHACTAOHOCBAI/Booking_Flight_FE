import flightApi from '@/apis/apis/flight.api'
import { ListConfig } from '@/globalType/listConfig.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

export const useGetAllFlights = (queryConfig: ListConfig, enabled: boolean = true) => {
  const stableQueryConfig = useMemo(() => JSON.stringify(queryConfig), [queryConfig])

  return useQuery({
    queryKey: ['flights', stableQueryConfig],
    queryFn: () => flightApi.getFlights(queryConfig),
    enabled
  })
}
export const useUpdateFlight = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: flightApi.updateFlight,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['flights'], exact: false })
    }
  })
}
export const useGetFlightById = (id: string) => {
  return useQuery({
    queryKey: ['flights', id],
    queryFn: () => flightApi.getFlightById(id)
  })
}
export const useGetSeatByFlightId = (id: string) => {
  return useQuery({
    queryKey: ['flights/seats', id],
    queryFn: () => flightApi.getSeats(id)
  })
}
export const useCreateFlight = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: flightApi.createFlight,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['flights'] })
    }
  })
}

export const useDeleteFlight = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: flightApi.deleteFlight,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['flights'] })
    }
  })
}
