import http from '@/apis/http'
import { ListConfig } from '@/globalType/listConfig.type'
import { MyProfileTicketResList, UpdatePassword, UpdateProfile } from '@/globalType/myProfile.type'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'api/my-profile'

const myProfileApi = {
  getMyProfile: async () => {
    const res = await http.get<SuccessResponse<IAccountTable>>(URL)
    return res.data
  },
  updatePassword: async (param: UpdatePassword) => {
    const res = await http.put<SuccessResponse<string>>(URL + '/update-password', param)
    return res.data
  },
  getMyPurchaseTicket: async (params: ListConfig) => {
    const res = await http.get<SuccessResponse<MyProfileTicketResList>>(URL + '/tickets', { params })
    return res.data
  },
  updateMyProfile: async (param: UpdateProfile) => {
    const res = await http.put<SuccessResponse<string>>(URL + '/update-account', param)
    return res.data
  }
}
export default myProfileApi
