export {}

declare global {
  interface IAccountTable {
    id?: string
    username?: string
    password?: string
    email: string
    fullName?: string
    phone?: string
    role?: IRoleTable

    avatar?: string
  }
}

export interface AccountList {
  result: IAccountTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
