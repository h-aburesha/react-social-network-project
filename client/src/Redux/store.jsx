import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import friendshipSlice from "./friendshipSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        friendships: friendshipSlice.reducer,
    },
});

export default store;
