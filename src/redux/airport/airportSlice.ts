import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define the initial state using that type
interface IAirport {
    airportCode: string,
    airportName: string,
    location: string
}
interface initialState {
    listAirports: IAirport[]
}
const initialState: initialState = {
    listAirports: []
}
export const fetchAllAirports = createAsyncThunk(
    'fetchAllAirports',
    async () => {
        const res = await fetch("http://localhost:8080/bookingflight/airports");
        const data = await res.json();
        return data;
    }
)
export const airportSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllAirports.fulfilled, (state, action) => {
                state.listAirports = action.payload.result
            })
    }
})

export default airportSlice.reducer