import { MyProfileTicketRes } from './myProfile.type'

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
    ticketStatus?: string
    canBook?: boolean
    hasBooked?: boolean
  }
}

export interface TicketList {
  result: MyProfileTicketRes[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
export const TICKET_STATUSES_ENUM = {
  BOOKED: { text: 'BOOKED' },
  CANCELLED: { text: 'CANCELLED' },
  USED: { text: 'USED' },
  BOARDING: { text: 'BOARDING' },
  AVAILABLE: { text: 'AVAILABLE' }
}
