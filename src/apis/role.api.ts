import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'
import { RoleList } from '@/globalType/role.type'
import { ListConfig } from '@/globalType/ListConfig.type'

const URL = 'api/roles'

const roleApi = {
  getRoleById: async (params: string) => {
    const res = await http.get<SuccessResponse<IRoleTable>>(URL, { params })
    return res.data
  },
  getRoles: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<RoleList>>(URL, { params })
    return res.data
  },
  createRole: async (param: IRoleTable) => {
    const res = await http.post<SuccessResponse<IRoleTable>>(URL, param)
    return res.data
  },
  deleteRole: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateRole: async (param: IRoleTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default roleApi
