export {}

declare global {
  interface IPlaneTable {
    id?: string
    planeCode: string
    planeName: string
    airlineId?: string
    airlineName?: string
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
