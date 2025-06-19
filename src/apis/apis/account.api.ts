import http from '@/apis/http'
import { SuccessResponse } from '@/globalType/util.type'
import { AccountList, NewAccountReq } from '@/globalType/account.type'
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

  createAccount: async (param: NewAccountReq) => {
    const formData = new FormData()
    formData.append('account', new Blob([JSON.stringify(param.account)], { type: 'application/json' }))
    if (param.avatar) formData.append('avatar', param.avatar)
    const res = await http.post<SuccessResponse<IAccountTable>>(URL, formData)
    return res.data
  },

  deleteAccount: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateAccount: async (param: NewAccountReq) => {
    const res = await http.put<SuccessResponse<string>>(`${URL}/${param.account.id}`, param)
    return res.data
  }
}
export default accountApi
