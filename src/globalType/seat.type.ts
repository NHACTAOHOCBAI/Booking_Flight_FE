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
