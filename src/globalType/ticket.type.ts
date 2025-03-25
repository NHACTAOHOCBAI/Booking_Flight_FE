export {}

declare global {
  interface ITicketTable {
    id?: string
    flightId: string
    seatId: string
    passengerName: string
    passengerPhone: string
    passengerIDCard: string
    passengerEmail: string
  }
}
