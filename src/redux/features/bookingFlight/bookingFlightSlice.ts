import { QueryConfig } from '@/hooks/useQueryConfig'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BookingState {
  departureFlightDetails: (IFlightTable & { selectedSeat: ISeat }) | null
  returnFlightDetails: (IFlightTable & { selectedSeat: ISeat }) | null
  queryConfig: QueryConfig
  amountPayment: number
  ticketNumbers: { ticketId: string; seatNumber: number }[]
}

const initialState: BookingState = {
  departureFlightDetails: null,
  returnFlightDetails: null,
  queryConfig: {
    page: '1'
  },
  amountPayment: 0,
  ticketNumbers: []
}

const bookingFlightSlice = createSlice({
  name: 'bookingFlight',
  initialState,
  reducers: {
    setBookingFlight: (_, action: PayloadAction<BookingState>) => {
      return action.payload
    },
    setAmountPayment: (state, action: PayloadAction<number>) => {
      state.amountPayment = action.payload
    }
  }
})

export const { setBookingFlight, setAmountPayment } = bookingFlightSlice.actions
export default bookingFlightSlice.reducer
