import { createSlice } from "@reduxjs/toolkit";

const defaultData = {
  name: "",
  idNumber: "",
  quantity: "",
  price: "",
  unit: "liter",
  category: "alcohol",
  productCondition: "norm",
};

const initialState = {
  data: defaultData,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = { ...state.data, ...action.payload };
    },
    clearData: (state) => {
      state.data = defaultData;
    },
  },
});

export const productSliceActions = productSlice.actions;
export default productSlice.reducer;
