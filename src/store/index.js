import { configureStore } from "@reduxjs/toolkit";
import { appReducer, boardReducer, taskReducer } from "./reducers";
import { loadState } from "./browser-storage";


export default configureStore({
    reducer: {
        tasks: taskReducer,
        app: appReducer,
        boards: boardReducer,
    },
    preloadedState: loadState()
})