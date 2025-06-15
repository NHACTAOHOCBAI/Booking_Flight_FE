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
  seatNumber: number
}

export interface IFlight {
  id: string
  flightCode: string
  plane: IPlane
  departureAirport: IAirport
  arrivalAirport: IAirport
  departureTime: string
  arrivalTime: string
  originPrice: number
  flightStatus: string
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

export interface UpdatePassword {
  oldPassword: string
  newPassword: string
}

export interface UpdateProfile {
  email?: string
  fullName?: string
  phone?: string
  avatar?: string
}
