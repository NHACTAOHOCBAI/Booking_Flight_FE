import { configureStore } from "@reduxjs/toolkit";
import bookingFlightReducer from "./features/bookingFlight/bookingFlightSlice"
import bookingTicketsListReducer from "./features/bookingTicket/bookingTicketsList"
export const store = configureStore({
    reducer: {
        bookingFlight: bookingFlightReducer,
        bookingTicketsList: bookingTicketsListReducer
    },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store