import {configureStore} from "@reduxjs/toolkit";
import {membersReducer} from "./membersSlice";
import {timerReducer} from "./timerSlice";
import {saveState} from "../helpers/storage";
import throttle from 'lodash.throttle';
import {tickerReducer} from "./tickerSlice";
import {composeWithDevTools} from "@redux-devtools/extension";


const store = configureStore({
    reducer: {
        members: membersReducer,
        timer: timerReducer,
        ticker: tickerReducer
    },
    enhancers: composeWithDevTools({})
});

//credits: https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e
store.subscribe(throttle(() => {
    saveState({
        members: store.getState().members,
        timer: store.getState().timer
    });
}, 1000));

export default store;
