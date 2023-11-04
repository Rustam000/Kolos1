import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { warehouseReducer } from "./warehouseSlice";
import { distributorsReducer } from "./distributorsSlice";
import { archiveReducer } from "./archiveSlice";
import { productReducer } from "./editproductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
    distributors: distributorsReducer,
    product: productReducer,
    archive: archiveReducer,
  },
});
