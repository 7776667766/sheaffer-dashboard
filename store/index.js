import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { businessReducer } from "./business/businessSlice";
import { adminReducer } from "./admin/adminSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
   
    business: businessReducer,
    admin: adminReducer,
   

  },
});

export default store;
