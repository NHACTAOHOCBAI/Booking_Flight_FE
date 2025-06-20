import http from '@/apis/http'
import httpFormData from '@/apis/httpFormData'
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
    formData.append('account', JSON.stringify(param.account))

    if (param.avatar) {
      formData.append('avatar', param.avatar)
    }

    const res = await httpFormData.post<SuccessResponse<IAccountTable>>(URL, formData)

    return res.data
  },
  deleteAccount: async (id: string) => {
    const res = await http.delete<SuccessResponse<string>>(`${URL}/${id}`)
    return res.data
  },
  updateAccount: async (param: NewAccountReq) => {
    // Check if we have an avatar to upload
    if (param.avatar) {
      const formData = new FormData()
      formData.append('account', JSON.stringify(param.account))
      formData.append('avatar', param.avatar)

      const res = await httpFormData.put<SuccessResponse<string>>(`${URL}/${param.account.id}`, formData)
      return res.data
    } else {
      // If no avatar, just send JSON data
      const res = await http.put<SuccessResponse<string>>(`${URL}/${param.account.id}`, param.account)
      return res.data
    }
  }
}
export default accountApi
