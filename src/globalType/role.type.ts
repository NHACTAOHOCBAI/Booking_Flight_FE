import { IPermission } from './permission.type'

export { }

declare global {
  interface IRoleTable {
    id?: string
    roleName: string
    description: string
    permissions: string[] | IPermission[]
    canDelete?: boolean
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
