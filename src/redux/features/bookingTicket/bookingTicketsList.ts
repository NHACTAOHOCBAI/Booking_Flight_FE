import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITicketTable[] = [
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