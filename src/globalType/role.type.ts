import { IPermission } from './permission.type'

export {}

declare global {
  interface IRoleTable {
    id?: string
    roleName: string
    description: string
    permissionId: string[] | IPermission[]
  }
}

export interface RoleList {
  result: IRoleTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface RoleListConfig {
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
