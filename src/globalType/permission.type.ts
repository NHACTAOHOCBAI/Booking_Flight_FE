export interface IPermission {
  id?: string
  name?: string
  apiPath?: string
  method?: string
  model?: string

  createdBy?: string
  isDeleted?: boolean
  deletedAt?: boolean | null
  createdAt?: string
  updatedAt?: string
}

export interface GroupPermission {
  model: string
  permissions: IPermission[]
}

export interface PermissionList {
  result: IPermission[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}

export const PERMISSIONS = {}
