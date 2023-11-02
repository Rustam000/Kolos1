import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { warehouseReducer } from "./warehouseSlice";
import { distributorsReducer } from "./distributorsSlice";
import { orderReducer } from "./orderSlice";
import { profileReducer } from "./profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
    distributors: distributorsReducer,
    profile: profileReducer,
    order: orderReducer,
  },
});
