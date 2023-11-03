import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postProduct = createAsyncThunk(
  "product/postProduct",
  async (_, thunkAPI) => {
    try {
      const wholeState = thunkAPI.getState();
      const productState = wholeState.product;
      const formData = productState.data;
      const response = await axios.post(
        `http://51.20.115.221/api/v1/product/`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const updateProductById = createAsyncThunk(
  "product/updateProductById",
  async (id, thunkAPI) => {
    try {
      const wholeState = thunkAPI.getState();
      const productState = wholeState.product;
      const formData = productState.data;
      const response = await axios.put(
        `http://51.20.115.221/api/v1/product/${id}/`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const archiveProductById = createAsyncThunk(
  "product/updateProductById",
  async (id, thunkAPI) => {
    try {
      const wholeState = thunkAPI.getState();
      const productState = wholeState.product;
      const formData = productState.data;
      const response = await axios.put(
        `http://51.20.115.221/api/v1/product/${id}/`,
        { ...formData, is_archived: true },
      );
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://51.20.115.221/api/v1/product/${id}/`,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
      console.warn({ errorData: error.response.data });
    }
  },
);

const defaultData = {
  name: "",
  identification_number: "",
  quantity: "",
  price: "",
  unit: "liter",
  category: "alcohol",
  state: "Normal",
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
  extraReducers: (builder) => {
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const productSliceActions = productSlice.actions;
export default productSlice.reducer;
