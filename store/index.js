import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { managerReducer } from "./manager/managerSlice";
import { specialistReducer } from "./Specialist/SpecialistSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    manager: managerReducer,
    specialist : specialistReducer,
  },
});

export default store;
