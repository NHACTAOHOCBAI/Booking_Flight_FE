import flightApi from '@/apis/flight.api'
import { FlightListConfig } from '@/globalType/flight.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllFlights = (queryConfig: FlightListConfig) => {
  return useQuery({
    queryKey: ['flights', queryConfig],
    queryFn: () => flightApi.getFlights(queryConfig)
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

export const useUpdateFlight = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: flightApi.updateFlight,
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
