import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import userReducer from "./userSlice";

export default configureStore({
    reducer: {
        counter: counterReducer,
    },
    // reducer: {
    //     user: userReducer,
    // },
});
