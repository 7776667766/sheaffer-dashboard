import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { managerReducer } from "./manager/managerSlice";
import { specialistReducer } from "./specialist/specialistSlice";
import { businessReducer } from "./business/businessSlice";
import { adminReducer } from "./admin/adminSlice";
import { serviceReducer } from './service/serviceSlice';
import { bookingReducer } from "./booking/bookingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    manager: managerReducer,
    specialist: specialistReducer,
    business: businessReducer,
    admin: adminReducer,
    service: serviceReducer,
    booking: bookingReducer
  },
});

export default store;
