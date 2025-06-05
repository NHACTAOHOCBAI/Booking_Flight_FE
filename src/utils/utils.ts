import { GroupPermission, IPermission } from '@/globalType/permission.type'
import { grey, green, blue, red, orange } from '@ant-design/colors'
import axios, { AxiosError } from 'axios'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormData>(error: unknown): error is AxiosError<FormData> {
  return isAxiosError(error) && error.response?.status === 400
}

export const groupByPermission = (data: IPermission[]): GroupPermission[] => {
  const groupedData = groupBy(data, (x) => x.model)
  return map(groupedData, (value, key) => {
    return { model: key, permissionId: value as IPermission[] }
  })
}

export function colorMethod(method: 'POST' | 'PUT' | 'GET' | 'DELETE' | string) {
  switch (method) {
    case 'POST':
      return green[6]
    case 'PUT':
      return orange[6]
    case 'GET':
      return blue[6]
    case 'DELETE':
      return red[6]
    default:
      return grey[10]
  }
}
export const path = {
  home: '/',
  user: '/user',
  booking: '/booking',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login',
  register: '/register',
  logout: '/logout'
} as const
