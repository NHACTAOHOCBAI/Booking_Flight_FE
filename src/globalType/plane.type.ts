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
  meta: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface PlaneListConfig {
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
