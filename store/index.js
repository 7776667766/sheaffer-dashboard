import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { managerReducer } from "./manager/managerSlice";
import { specialistReducer } from "./specialist/specialistSlice";
import { businessReducer } from "./business/businessSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    manager: managerReducer,
    specialist: specialistReducer,
    business: businessReducer,
  },
});

export default store;
