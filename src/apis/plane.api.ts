import http from '@/utils/http'
import { SuccessResponse } from '@/globalType/util.type'

const URL = 'planes'
const planeApi = {
  getPlanes: () => {
    return http.get<SuccessResponse<IPlaneTable[]>>(URL)
      .then(
        res => res.data
      )
  }
}
export default planeApi
