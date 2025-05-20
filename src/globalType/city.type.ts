export {}

declare global {
  interface ICityTable {
    id?: string
    cityCode: string
    cityName: string
  }
}

export interface CityList {
  result: ICityTable[]
  meta: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface CityListConfig {
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
