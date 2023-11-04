import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { warehouseReducer } from "./warehouseSlice";
import { archiveReducer } from "./archiveSlice";
import { distributorReducer } from "./editDistributorSlice";
import { distributorsReducer } from "./distributorsSlice";
import { productReducer } from "./editproductSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
    distributor: distributorReducer,
    distributors: distributorsReducer,
    product: productReducer,
    archive: archiveReducer,
  },
});
