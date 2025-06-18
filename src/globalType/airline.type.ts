export { }

declare global {
  interface IAirlineTable {
    id?: string
    airlineCode: string
    airlineName: string
    canUpdate?: boolean
    canDelete?: boolean
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
