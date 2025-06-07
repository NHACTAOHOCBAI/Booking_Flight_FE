export interface MyProfileTicketResList {
  result: MyProfileTicketRes[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}

export interface MyProfileTicketRes {
  id: string
  seatId: string
  seatName: string
  passengerName: string
  passengerPhone: string
  passengerIDCard: string
  passengerEmail: string
  haveBaggage: boolean
  flight: IFlight
}

export interface IFlight {
  id: string
  flightCode: string
  plane: IPlane
  departureAirport: IAirport
  arrivalAirport: IAirport
  departureTime: string // Có thể đổi thành Date nếu bạn parse
  arrivalTime: string
  originPrice: number
}

export interface IPlane {
  id: string
  planeCode: string
  planeName: string
  airline: IAirline
}

export interface IAirline {
  id: string
  airlineCode: string
  airlineName: string
}

export interface IAirport {
  id: string
  airportCode: string
  airportName: string
  city: ICity
}

export interface ICity {
  id: string
  cityCode: string
  cityName: string
}

export interface UPdatePassword {
  oldPassword: string
  newPassword: string
}
