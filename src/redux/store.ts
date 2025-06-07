import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Reducers
import bookingFlightReducer from './features/bookingFlight/bookingFlightSlice'
import bookingTicketsListReducer from './features/bookingTicket/bookingTicketsList'

// Combine reducers
const rootReducer = combineReducers({
  bookingFlight: bookingFlightReducer,
  bookingTicketsList: bookingTicketsListReducer
})

// Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['bookingFlight', 'bookingTicketsList'] // những reducer muốn lưu
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Tạo store với middleware redux-persist
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Cấu hình để tránh lỗi khi dùng redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store) // cần export ra để dùng với <PersistGate />

// Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
