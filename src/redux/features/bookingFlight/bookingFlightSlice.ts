import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IFlightTable = {
  id: '',
  flightCode: '',
  planeId: '',
  departureAirportId: '',
  arrivalAirportId: '',
  departureTime: '',
  arrivalTime: '',
  originPrice: 0,
  listFlight_Airport: [],
  listFlight_Seat: []
}

const bookingFlightSlice = createSlice({
  name: 'bookingFlight',
  initialState,
  reducers: {
    setBookingFlight: (_, action: PayloadAction<IFlightTable>) => {
      return action.payload
    }
  }
})

export const { setBookingFlight } = bookingFlightSlice.actions
export default bookingFlightSlice.reducer
