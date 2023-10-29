import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    name: '',
    idNumber: '',
    quantity: '',
    price: '',
    sum: '',
    unit: 'шт',
    category: 'Алкогольное'
  },
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    clearData: (state) => {
      state.data = initialState.data;
    },
  },
});

export const { setData, clearData } = productSlice.actions;

export default productSlice.reducer;
