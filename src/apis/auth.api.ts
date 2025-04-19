import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = '/login'

const authApi = {
  login: (params: { username: string; password: string }) => {
    return http.post<SuccessResponse<ILogin>>(URL, params)
      .then(
        res => res.data
      )
  }
}
export default authApi
