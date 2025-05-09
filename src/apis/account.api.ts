import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'api/accounts'

const accountApi = {
  getAccountById: async (params: string) => {
    const res = await http.get<SuccessResponse<IAccountTable>>(URL, { params })
    return res.data
  },
  getAccounts: async () => {
    const res = await http.get<SuccessResponse<IAccountTable[]>>(URL)
    return res.data
  },
  createAccount: async (param: IAccountTable) => {
    const res = await http.post<SuccessResponse<IAccountTable>>(URL, param)
    return res.data
  },
  deleteAccount: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateAccount: async (param: IAccountTable) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.id}`, param)
    return res.data
  }
}
export default accountApi
