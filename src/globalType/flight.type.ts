export {}

declare global {
  interface IFlightTable {
    id?: string
    flightCode: string
    planeId?: string
    planeName?: string
    flightStatus?: string
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
    quantityAvailable: number
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
