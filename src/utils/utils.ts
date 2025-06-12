/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupPermission, IPermission } from '@/globalType/permission.type'
import { grey, green, blue, red, orange } from '@ant-design/colors'
import axios, { AxiosError } from 'axios'
import dayjs from 'dayjs'
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
    return { model: key, permissions: value as IPermission[] }
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

export function getTimeDifference(arrivalTime: string, departureTime: string): string {
  const formatString = 'HH:mm DD/MM/YYYY'

  const arrival = dayjs(arrivalTime, formatString)
  const departure = dayjs(departureTime, formatString)

  if (!arrival.isValid() || !departure.isValid()) {
    console.error("Lỗi: Định dạng thời gian không hợp lệ. Vui lòng sử dụng 'HH:mm DD/MM/YYYY'.")
    return 'Invalid Date'
  }

  const diffMs = departure.diff(arrival, 'millisecond')

  if (diffMs < 0) {
    return '0h0m (Departure before Arrival)'
  }

  const totalMinutes = Math.floor(diffMs / (1000 * 60))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}h${minutes}m`
}

export const validateIntermediateTime = (form: any, type: 'departure' | 'arrival') => async (_: any, value: any) => {
  const depMain = form.getFieldValue('departureTime')
  const retMain = form.getFieldValue('arrivalTime')

  if (!value || !depMain || !retMain) return Promise.resolve()

  const time = dayjs(value)

  if (type === 'departure') {
    if (time.isBefore(dayjs(depMain))) {
      return Promise.reject('Departure of stopover must be after main departure')
    }
    if (time.isAfter(dayjs(retMain))) {
      return Promise.reject('Departure of stopover must be before main arrival')
    }
  }

  if (type === 'arrival') {
    // Get current stopover departureTime for this row to compare
    const allInter = form.getFieldValue('listFlight_Airport') || []
    const fieldPath = _.field || ''
    const index = Number(fieldPath.split('.')[1])
    const stopover = allInter[index]
    const interDep = stopover?.departureTime
    console.log(index)
    if (interDep && time.isBefore(dayjs(interDep))) {
      return Promise.reject('Arrival of stopover must be after stopover departure')
    }

    if (time.isAfter(dayjs(retMain))) {
      return Promise.reject('Arrival of stopover must be before main arrival')
    }
  }

  return Promise.resolve()
}
