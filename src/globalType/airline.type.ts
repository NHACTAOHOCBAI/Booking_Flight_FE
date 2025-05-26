export {}

declare global {
  interface IAirlineTable {
    id?: string
    airlineCode: string
    airlineName: string
  }
}

export interface AirlineList {
  result: IAirlineTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface AirlineListConfig {
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
