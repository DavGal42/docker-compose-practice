// store.js
import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./userSlice.js";

const store = configureStore({
  reducer: {
    users: UserSlice.reducer,
  },
});

export default store;
