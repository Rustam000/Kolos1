import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { warehouseReducer } from "./warehouseSlice";
import { distributorsReducer } from "./distributorsSlice";
import productReducer from "./editproductSlice";
import { archiveReducer } from "./archiveSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
    distributors: distributorsReducer,
    product: productReducer,
    archive: archiveReducer,
  },
});
