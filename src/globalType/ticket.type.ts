export {}

declare global {
  interface ITicketTable {
    id?: string
    flightId?: string
    flightCode?: string
    seatId?: string
    seatName?: string
    seatNumber?: number
    passengerName?: string
    passengerPhone?: string
    passengerIDCard?: string
    passengerEmail?: string
    haveBaggage?: boolean
    imageUrl?: string
  }
}

export interface TicketList {
  result: ITicketTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
