export interface IPermission {
  id?: string
  name?: string
  apiPath?: string
  method?: string
  model?: string
}

export interface GroupPermission {
  model: string
  permissionId: IPermission[]
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
