import cityApi from '@/apis/city.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllCites = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: cityApi.getCities
  })
}

export const useCityGetById = (id: string) => {
  return useQuery({
    queryKey: ['airports', id],
    queryFn: () => cityApi.getCItyById(id)
  })
}

export const useCreateCity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cityApi.createCity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cities'] })
    }
  })
}

export const useUpdateCity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cityApi.updateCity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cities'] })
    }
  })
}
export const useDeleteCity = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cityApi.deleteCity,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['cities'] })
    }
  })
}
