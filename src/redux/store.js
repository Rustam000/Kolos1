import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { warehouseReducer } from "./warehouseSlice";
import { archiveReducer } from "./archiveSlice";
import { distributorReducer } from "./editDistributorSlice";
import { distributorsReducer } from "./distributorsSlice";
import { productReducer } from "./editproductSlice";
import { profileReducer } from "./profileSlice";
import { orderReducer } from "./orderSlice";
import { optionsReducer } from "./optionsSlice";
import { returnReducer } from "./returnSlice";
import { transactionReducer } from "./transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    warehouse: warehouseReducer,
    distributor: distributorReducer,
    distributors: distributorsReducer,
    product: productReducer,
    archive: archiveReducer,
    profile: profileReducer,
    order: orderReducer,
    return: returnReducer,
    options: optionsReducer,
    transaction: transactionReducer,
  },
});
