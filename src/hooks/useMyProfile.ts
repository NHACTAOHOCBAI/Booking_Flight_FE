import myProfileApi from '@/apis/apis/myprofile.api'
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
