import myProfileApi from '@/apis/apis/myprofile.api'
import { ListConfig } from '@/globalType/listConfig.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: () => myProfileApi.getMyProfile()
  })
}
export const useUpdatePassword = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: myProfileApi.updatePassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['my-profile'] })
    }
  })
}

export const useGetMyPurchaseTicket = (queryConfig: ListConfig) => {
  return useQuery({
    queryKey: ['my-profile-ticket-purchased', queryConfig],
    queryFn: () => myProfileApi.getMyPurchaseTicket(queryConfig)
  })
}
