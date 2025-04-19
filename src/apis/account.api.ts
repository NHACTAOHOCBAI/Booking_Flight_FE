import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'accounts'

const accountApi = {
  getAccounts: () => {
    return http.get<SuccessResponse<IAccountTable[]>>(URL)
      .then(
        res => res.data
      )
  },
  createAccounts: (param: IAccountTable) => {
    return http.post<SuccessResponse<IAccountTable>>(URL, param)
      .then(
        res => res.data
      )
  },
  deleteAccounts: (id: string) => {
    return http.post<SuccessResponse<string>>(URL, id)
      .then(
        res => res.data
      )
  }
}
export default accountApi
