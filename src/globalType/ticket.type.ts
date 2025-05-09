export {}

declare global {
  interface ITicketTable {
    id?: string
    flightId: string
    flightName: string
    seatId?: string
    seatName?: string
    passengerName: string
    passengerPhone: string
    passengerIDCard: string
    passengerEmail: string
    haveBaggage: boolean
  }
}
