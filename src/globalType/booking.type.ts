export {}

declare global {
  interface IBookingTable {
    id?: string
    flightId: string
    seatId: string
    accountId?: string
    passengers: Pick<
      ITicketTable,
      'passengerName' | 'passengerPhone' | 'passengerIDCard' | 'passengerEmail' | 'haveBaggage'
    >[]
  }
}

export interface PaymentReq {
  amount: number
  orderInfo: string
}

export interface PaymentRes {
  code: string
  message: string
  paymentUrl: string
  txnRef: string
}

export interface CheckPaymentStatusRes {
  id: string
  amount: number
  orderInfo: string
  txnRef: string
  status: string
  vnpTransactionNo: string
  bankCode: string
  cardType: string
  createdAt: string
  paidAt: string
  accountId: string
}
