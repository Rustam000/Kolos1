import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { warehouseReducer } from "./warehouseSlice";
import { distributorsReducer } from "./distributorsSlice";
import { editDistributorReducer } from "./editDistributorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
    distributors: distributorsReducer,
    editDistributor: editDistributorReducer,
  },
});
