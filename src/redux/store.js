import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { warehouseReducer } from "./warehouseSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
  },
});
