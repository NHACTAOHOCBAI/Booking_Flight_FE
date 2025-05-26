export {}

declare global {
  interface IFlightTable {
    id?: string
    flightCode: string
    planeId?: string
    planeName?: string
    departureAirportId?: string
    departureAirportName?: string
    arrivalAirportId?: string
    arrivalAirportName?: string
    departureTime: string
    arrivalTime: string
    originPrice: number
    listFlight_Airport: IInterAirport[]
    listFlight_Seat: ISeat[]
  }
  interface IInterAirport {
    id?: string
    airportId?: string
    airportName?: string
    departureTime: string
    arrivalTime: string
    note: string
    flightId?: string
  }
  interface ISeat {
    seatId?: string
    seatName?: string
    price: number
    quantity: number
  }
}

export interface FlightList {
  result: IFlightTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export interface FlightListConfig {
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
