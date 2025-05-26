export {}

declare global {
  interface ISeatTable {
    id?: string
    seatName: string
    seatCode: string
    price: number
    description: string
  }
}

export interface SeatList {
  result: ISeatTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface SeatListConfig {
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
