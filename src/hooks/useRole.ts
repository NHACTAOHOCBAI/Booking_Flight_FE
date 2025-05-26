import roleApi from '@/apis/role.api.ts'
import { RoleListConfig } from '@/globalType/role.type.ts'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAllRoles = (queryConfig: RoleListConfig) => {
  return useQuery({
    queryKey: ['roles', queryConfig],
    queryFn: () => roleApi.getRoles(queryConfig)
  })
}

export const useRoleGetById = (id: string) => {
  return useQuery({
    queryKey: ['roles', id],
    queryFn: () => roleApi.getRoleById(id)
  })
}

export const useCreateRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: roleApi.createRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['roles'] })
    }
  })
}

export const useUpdateRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: roleApi.updateRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['roles'] })
    }
  })
}
export const useDeleteRole = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: roleApi.deleteRole,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['roles'] })
    }
  })
}
