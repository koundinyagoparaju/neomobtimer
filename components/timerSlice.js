import {createSlice} from "@reduxjs/toolkit";


const timerSlice = createSlice({
    name: "timer",
    initialState: {
        totalSeconds: 1200,
        remainingSeconds: 1200,
        isStarted: false,
        isRunning: false,
        isPaused: false
    },
    reducers: {
        setTime(state, action) {
            state.totalSeconds = action.payload;
            state.remainingSeconds = action.payload;
        },
        tick(state, action) {
           if(state.isRunning) {
               state.remainingSeconds -= 1;
           }
        },
        start(state, action) {
            state.isStarted = true;
            state.isRunning = true;
        },
        pause(state, action) {
            state.isPaused = true;
            state.isRunning = false;
        },
        resume(state, action) {
            state.isPaused = false;
            state.isRunning = true;
        },
        reset(state, action) {
            state.remainingSeconds = state.totalSeconds;
            state.isStarted = false;
            state.isRunning = false;
            state.isPaused = false;
        },
        finished(state, action) {
            state.isStarted = false;
            state.isRunning = false;
            state.remainingSeconds = state.totalSeconds;
        },
        loadState(state, action) {
            const {totalSeconds, remainingSeconds, isStarted, isRunning, isPaused} = action.payload;
            state.totalSeconds = totalSeconds;
            state.remainingSeconds = remainingSeconds;
            state.isStarted = isStarted;
            state.isRunning = isRunning;
            state.isPaused = isPaused;
        }
    }
});

export const timerReducer = timerSlice.reducer;
export const timerActions = timerSlice.actions;