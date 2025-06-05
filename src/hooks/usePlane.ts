import planeApi from '@/apis/apis/plane.api'
import { PlaneListConfig } from '@/globalType/plane.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllPlanes = (queryConfig: PlaneListConfig) => {
  return useQuery({
    queryKey: ['planes', queryConfig],
    queryFn: () => planeApi.getPlanes(queryConfig)
  })
}

export const useGetPlaneById = (id: string) => {
  return useQuery({
    queryKey: ['planes', id],
    queryFn: () => planeApi.getPlaneById(id)
  })
}

export const useCreatePlane = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: planeApi.createPlane,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['planes'] })
    }
  })
}

export const useUpdatePlane = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: planeApi.updatePlane,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['planes'] })
    }
  })
}
export const useDeletePlane = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: planeApi.deletePlane,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['planes'] })
    }
  })
}
