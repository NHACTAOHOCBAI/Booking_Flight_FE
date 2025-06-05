import http from '@/apis/http'
import { SuccessResponse } from '@/globalType/util.type'
import { AccountList } from '@/globalType/account.type'
import { ListConfig } from '@/globalType/listConfig.type'

const URL = 'api/accounts'

const accountApi = {
  getAccountById: async (params: string) => {
    const res = await http.get<SuccessResponse<IAccountTable>>(`${URL}/${params}`)
    return res.data
  },
  getAccounts: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<AccountList>>(URL, { params })
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
