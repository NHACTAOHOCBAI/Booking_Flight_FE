import http from '@/apis/http'
import { SuccessResponse } from '@/globalType/util.type'
import { PermissionList } from '@/globalType/permission.type'
import { ListConfig } from '@/globalType/listConfig.type'

const URL = 'api/permissions'

const permissionApi = {
  getPermissions: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<PermissionList>>(URL, { params })
    return res.data
  }
}
export default permissionApi
