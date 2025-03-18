import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// Define the initial state using that type
interface IAirport {
    airportCode: string,
    airportName: string,
    location: string
}
interface INewAirport {
    airportName: string,
    location: string
}
interface initialState {
    listAirports: IAirport[],
    isDoneCreate: boolean
}
const initialState: initialState = {
    listAirports: [],
    isDoneCreate: false
}
export const fetchAllAirports = createAsyncThunk(
    'fetchAllAirports',
    async () => {
        const res = await fetch("http://localhost:8080/bookingflight/airports");
        const data = await res.json();
        return data;
    }
)
export const createAirport = createAsyncThunk(
    'createAirport',
    async (value: INewAirport, thunkAPI) => {
        const res = await fetch("http://localhost:8080/bookingflight/airports", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"  // Thêm header JSON
            },
            body: JSON.stringify(value)
        });
        const data: APIResponse<IAirport[]> = await res.json();
        if (data.result) {
            thunkAPI.dispatch(fetchAllAirports());
        }
        return data;
    }
)
export const airportSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
        setDoneCreate: (state) => {
            state.isDoneCreate = false;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAllAirports.fulfilled, (state, action) => {
                state.listAirports = action.payload.result
            })
            // create
            .addCase(createAirport.fulfilled, (state) => {
                state.isDoneCreate = true;
            })
    }
})
export const { setDoneCreate } = airportSlice.actions
export default airportSlice.reducer