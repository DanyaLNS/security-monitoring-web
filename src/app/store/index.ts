import { configureStore } from '@reduxjs/toolkit'
import {api} from "../../shard/api/api.ts";


export const store = configureStore({
    reducer: {
        // events: eventsReducer,
        // filters: filtersReducer,

        [api.reducerPath]: api.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch