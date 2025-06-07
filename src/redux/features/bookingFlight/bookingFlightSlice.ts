import { QueryConfig } from '@/hooks/useQueryConfig'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BookingState {
  departureFlightDetails: (IFlightTable & { selectedSeat: ISeat }) | null
  returnFlightDetails: (IFlightTable & { selectedSeat: ISeat }) | null
  queryConfig: QueryConfig
}

const initialState: BookingState = {
  departureFlightDetails: null,
  returnFlightDetails: null,
  queryConfig: {
    page: '1',
    size: '5'
  }
}

const bookingFlightSlice = createSlice({
  name: 'bookingFlight',
  initialState,
  reducers: {
    setBookingFlight: (_, action: PayloadAction<BookingState>) => {
      return action.payload
    }
  }
})

export const { setBookingFlight } = bookingFlightSlice.actions
export default bookingFlightSlice.reducer
