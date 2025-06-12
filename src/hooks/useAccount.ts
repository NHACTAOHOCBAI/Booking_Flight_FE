import accountApi from '@/apis/apis/account.api'

import { ListConfig } from '@/globalType/listConfig.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllAccounts = (queryConfig: ListConfig) => {
  return useQuery({
    queryKey: ['accounts', queryConfig],
    queryFn: () => accountApi.getAccounts(queryConfig)
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
