import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { warehouseReducer } from "./warehouseSlice";
import { distributorsReducer } from "./distributorsSlice";
import distributorProfile from "./distributorProfileSlice";
import { orderReducer } from "./orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
    distributors: distributorsReducer,
    distributor: distributorProfile,
    order: orderReducer,
  },
});
