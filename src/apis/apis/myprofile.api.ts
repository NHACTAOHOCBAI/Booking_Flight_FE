import http from '@/apis/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'api/my-profile'

interface UPdatePassword {
  oldPassword: string
  newPassword: string
}

const myProfileApi = {
  getMyProfile: async () => {
    const res = await http.get<SuccessResponse<IAccountTable>>(URL)
    return res.data
  },
  updatePassword: async (param: UPdatePassword) => {
    const res = await http.put<SuccessResponse<string>>(URL + '/update-password', param)
    return res.data
  }
}
export default myProfileApi
