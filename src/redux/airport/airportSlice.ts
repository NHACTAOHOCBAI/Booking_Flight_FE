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
interface IUpdateAirport {
    airportCode: string,
    airportName: string,
    location: string
}
interface initialState {
    listAirports: IAirport[],
    isDoneCreate: boolean,
    isDoneUpdate: boolean,
    isDoneDelete: boolean
}
const initialState: initialState = {
    listAirports: [],
    isDoneCreate: false,
    isDoneUpdate: false,
    isDoneDelete: false
}
export const fetchAllAirports = createAsyncThunk(
    'fetchAllAirports',
    async () => {
        const res = await fetch("http://localhost:8080/bookingflight/airports");
        const data = await res.json();
        return data;
    }
)
export const deleteAirport = createAsyncThunk(
    'deleteAirport',
    async (value: string, thunkAPI) => {
        const res = await fetch(`http://localhost:8080/bookingflight/airports/${value}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"  // Thêm header JSON
            }
        });
        const data: APIResponse<void> = await res.json();
        if (data.code === 204) {
            thunkAPI.dispatch(fetchAllAirports());
        }
    }
)
export const updateAirport = createAsyncThunk(
    'updateAirport',
    async (value: IUpdateAirport, thunkAPI) => {
        const res = await fetch(`http://localhost:8080/bookingflight/airports/${value.airportCode}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"  // Thêm header JSON
            },
            body: JSON.stringify({
                airportName: value.airportName,
                location: value.location
            })
        });
        const data: APIResponse<IAirport> = await res.json();
        if (data.result) {
            thunkAPI.dispatch(fetchAllAirports());
        }
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
        const data: APIResponse<IAirport> = await res.json();
        if (data.result) {
            thunkAPI.dispatch(fetchAllAirports());
        }
    }
)
export const airportSlice = createSlice({
    name: 'airport',
    initialState,
    reducers: {
        setDoneCreate: (state) => {
            state.isDoneCreate = false;
        },
        setDoneUpdate: (state) => {
            state.isDoneUpdate = false;
        },
        setDoneDelete: (state) => {
            state.isDoneDelete = false;
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
            //update
            .addCase(updateAirport.fulfilled, (state) => {
                state.isDoneUpdate = true;
            })
            //delete
            .addCase(deleteAirport.fulfilled, (state) => {
                state.isDoneDelete = true;
            })
    }
})
export const { setDoneCreate, setDoneUpdate, setDoneDelete } = airportSlice.actions
export default airportSlice.reducer