import { NoticeType } from 'antd/es/message/interface'
import { AxiosError } from 'axios'

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export interface ErrorResponse<Data> {
  message: string
  data?: Data
}

export const onErrorUtil = (error: Error) => {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<ErrorResponse<unknown>>
    return {
      type: 'error' as NoticeType,
      content: axiosError.response?.data?.message ?? 'An error occurred'
    }
  } else
    return {
      type: 'error' as NoticeType,
      content: error.message ?? 'An unexpected error occurred'
    }
}
