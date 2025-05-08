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
