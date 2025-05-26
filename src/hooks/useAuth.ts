import accountApi from '@/apis/account.api'
import authApi from '@/apis/auth.api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetAccountById = (id: string) => {
  return useQuery({
    queryKey: ['accounts', id],
    queryFn: () => accountApi.getAccountById(id)
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login
  })
}
export const useRegister = () => {
  return useMutation({
    mutationFn: (body: IAccountTable) => authApi.register(body)
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authApi.logout()
  })
}
