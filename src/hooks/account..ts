import accountApi from '@/apis/account.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: accountApi.getAccounts
  })
}

export const useGetAccountById = (id: string) => {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: () => accountApi.getAccountById(id)
  })
}

export const useCreateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApi.createAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['accounts'] })
    }
  })
}

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApi.updateAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['accounts'] })
    }
  })
}
export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: accountApi.deleteAccount,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['accounts'] })
    }
  })
}
