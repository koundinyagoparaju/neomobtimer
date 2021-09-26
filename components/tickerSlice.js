import {createSlice} from "@reduxjs/toolkit";


const tickerSlice = createSlice({
    name: "ticker",
    initialState: {
        tickerId: -1
    },
    reducers: {
        tickerCreated(state, action) {
            state.tickerId = action.payload;
        },
        tickerDestroyed(state, action) {
            state.tickerId = -1;
        }
    }
});

export const tickerReducer = tickerSlice.reducer;
export const tickerActions = tickerSlice.actions;