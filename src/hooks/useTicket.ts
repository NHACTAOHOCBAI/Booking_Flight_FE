import ticketApi from '@/apis/ticket.api'
import { TicketListConfig } from '@/globalType/ticket.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllTickets = (queryConfig: TicketListConfig) => {
  return useQuery({
    queryKey: ['tickets', queryConfig],
    queryFn: () => ticketApi.getTickets(queryConfig)
  })
}

export const useGetTicketById = (id: string) => {
  return useQuery({
    queryKey: ['tickets', id],
    queryFn: () => ticketApi.getTicketById(id)
  })
}

export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ticketApi.createTicket,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tickets'] })
    }
  })
}

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ticketApi.updateTicket,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tickets'] })
    }
  })
}
export const useDeleteTicket = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ticketApi.deleteTicket,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tickets'] })
    }
  })
}
