import permissionApi from '@/apis/apis/permission.api'
import { IPermission } from '@/globalType/permission.type'
import { useQuery } from '@tanstack/react-query'

let cachedPermissions: AllPermissions | null = null

export const getCachedPermissions = () => cachedPermissions

export const loadPermissions = async () => {
  if (!cachedPermissions) {
    const res = await permissionApi.getPermissions({})
    cachedPermissions = transformPermissionsToObject(res.data.result)
  }
  return cachedPermissions
}

export const usePermissions = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['permissions'],
    queryFn: () => {
      return permissionApi.getPermissions({})
    },
    select: (response) => {
      const permissions = response.data.result

      return transformPermissionsToObject(permissions)
    },
    // Cấu hình để không gọi lại API trừ khi có yêu cầu
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  })

  return {
    permissions: data || {}, // ALL_PERMISSIONS
    isLoading,
    error,
    refetch // Hàm để gọi lại API khi cần
  }
}

interface PermissionModule {
  [key: string]: IPermission
}

export interface AllPermissions {
  [model: string]: PermissionModule
}

// Hàm chuyển đổi danh sách IPermission[] thành ALL_PERMISSIONS
const transformPermissionsToObject = (permissions: IPermission[]): AllPermissions => {
  const result: AllPermissions = {}

  permissions.forEach((perm) => {
    const model = perm.model // e.g., "COMPANIES"
    const name = perm.name // e.g., "READ_USER"

    if (!model || !name || !perm.method || !perm.apiPath) {
      return
    }

    if (!result[model]) {
      result[model] = {}
    }

    result[model][name] = {
      method: perm.method,
      apiPath: perm.apiPath,
      model,
      id: perm.id
    }
  })

  return result
}
