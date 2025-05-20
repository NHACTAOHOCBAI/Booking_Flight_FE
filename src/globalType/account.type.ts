export {}

declare global {
  interface IAccountTable {
    id?: string
    username: string
    password: string
    email: string
    fullName?: string
    phone?: string
    role?: number
  }
}

export interface AccountList {
  result: IAccountTable[]
  meta: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface AccountListConfig {
  page?: number | string
  size?: number | string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
}
