export {}

declare global {
  interface IAirportTable {
    id?: string
    airportCode: string
    airportName: string
    cityId?: string
    cityName?: string
  }
}

export interface AirportList {
  result: IAirportTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface AirportListConfig {
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
