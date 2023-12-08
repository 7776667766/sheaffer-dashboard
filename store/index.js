import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { managerReducer } from "./manager/managerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    manager: managerReducer,
  },
});

export default store;
