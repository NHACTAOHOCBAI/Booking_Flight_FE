import http from '@/apis/http'
import { ListConfig } from '@/globalType/listConfig.type'
import {
  MyProfileTicketRes,
  MyProfileTicketResList,
  UpdateAccountReq,
  UpdatePassword,
  UpdateProfile
} from '@/globalType/myProfile.type'
import { SuccessResponse } from '@/globalType/util.type'
import httpFormData from '../httpFormData'

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
  updateMyProfile: async (param: UpdateAccountReq) => {
    if (param.avatar) {
      const formData = new FormData()
      formData.append('account', JSON.stringify(param.account))
      formData.append('avatar', param.avatar)

      const res = await httpFormData.put<SuccessResponse<string>>(URL + '/update-account', formData)
      return res.data
    } else {
      // If no avatar, just send JSON data
      const res = await http.put<SuccessResponse<MyProfileTicketRes>>(URL + '/update-account', param.account)
      return res.data
    }
  }
}
export default myProfileApi
