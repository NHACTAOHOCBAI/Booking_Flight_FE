export { }

declare global {
  interface IAirportTable {
    id?: string
    airportCode: string
    airportName: string
    cityId?: string
    cityName?: string
    canUpdate?: boolean
    canDelete?: boolean
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
