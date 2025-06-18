import ticketApi from '@/apis/apis/ticket.api'
import { ListConfig } from '@/globalType/listConfig.type'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllTickets = (queryConfig: ListConfig, enable?: boolean) => {
  const isEnabled = enable ?? true

  return useQuery({
    queryKey: ['tickets', queryConfig],
    queryFn: () => ticketApi.getTickets(queryConfig),
    enabled: isEnabled
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

export const usePickUpTicket = () => {
  return useMutation({
    mutationFn: ticketApi.pickupAtTicket
  })
}
