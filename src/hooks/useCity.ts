import cityApi from '@/apis/apis/city.api'
import { ListConfig } from '@/globalType/listConfig.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllCities = (queryConfig: ListConfig, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['cities', queryConfig],
    queryFn: () => cityApi.getCities(queryConfig),
    enabled: enabled
  })
}

export const useGetCityById = (id: string) => {
  return useQuery({
    queryKey: ['cities', id],
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
