import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITicketTable[] = [
    { id: "1", flightId: "1", seatId: "1", passengerName: "John Doe", passengerPhone: "123456789", passengerIDCard: "ID001", passengerEmail: "john@example.com" },
    { id: "2", flightId: "1", seatId: "1", passengerName: "Jane Doe", passengerPhone: "987654321", passengerIDCard: "ID002", passengerEmail: "jane@example.com" },
    { id: "3", flightId: "1", seatId: "2", passengerName: "Alice", passengerPhone: "456789123", passengerIDCard: "ID003", passengerEmail: "alice@example.com" }
];

const bookingTicketsListSlice = createSlice({
    name: "bookingTicketsList",
    initialState,
    reducers: {
        setBookingTicketsList: (_, action: PayloadAction<ITicketTable[]>) => {
            return action.payload;
        }
    },
});

export const { setBookingTicketsList } = bookingTicketsListSlice.actions;
export default bookingTicketsListSlice.reducer;