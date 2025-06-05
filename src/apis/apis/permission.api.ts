import http from '@/apis/http'
import { SuccessResponse } from '@/globalType/util.type'
import { IPermission, PermissionList } from '@/globalType/permission.type'
import { ListConfig } from '@/globalType/listConfig.type'

const URL = 'api/permissions'

const permissionApi = {
  getPermissionById: async (params: string) => {
    const res = await http.get<SuccessResponse<IPermission>>(`${URL}/${params}`)
    return res.data
  },
  getPermissions: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<PermissionList>>(URL, { params })
    return res.data
  },
  createPermission: async (param: IPermission) => {
    const res = await http.post<SuccessResponse<IPermission>>(URL, param)
    return res.data
  },
  deletePermission: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updatePermission: async (param: IPermission) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default permissionApi
