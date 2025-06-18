export { }

declare global {
  interface IPlaneTable {
    id?: string
    planeCode: string
    planeName: string
    airlineId?: string
    airlineName?: string
    canUpdate?: boolean
    canDelete?: boolean
  }
}

export interface PlaneList {
  result: IPlaneTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
