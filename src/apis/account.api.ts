import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'accounts'

const accountApi = {
  getAccounts: () => {
    return http.get<SuccessResponse<IAccountTable[]>>(URL)
  },
  createAccounts: (param: IAccountTable) => {
    return http.post<SuccessResponse<IAccountTable>>(URL, param)
  },
  deleteAccounts: (id: string) => {
    return http.post<SuccessResponse<string>>(URL, id)
  }
}
export default accountApi
