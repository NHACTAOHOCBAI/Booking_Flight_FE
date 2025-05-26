export {}

declare global {
  interface ITicketTable {
    id?: string
    flightId?: string
    flightCode?: string
    seatId?: string
    seatName?: string
    passengerName?: string
    passengerPhone?: string
    passengerIDCard?: string
    passengerEmail?: string
    haveBaggage?: boolean
  }
}

export interface TicketList {
  result: ITicketTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface TicketListConfig {
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
