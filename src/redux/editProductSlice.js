import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axiosPrivate";

export const postProduct = createAsyncThunk(
  "product/postProduct",
  async (_, thunkAPI) => {
    try {
      const formData = thunkAPI.getState().product.data;
      const response = await axiosPrivate.post(`/products/`, formData);
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
      const formData = thunkAPI.getState().product.data;
      const response = await axiosPrivate.put(`/products/${id}/`, formData);
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const archiveProductById = createAsyncThunk(
  "product/archiveProductById",
  async (id) => {
    try {
      const response = await axiosPrivate.delete(`/products/${id}/`);
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    try {
      const response = await axiosPrivate.get(`/products/${id}/`);
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

export const productActions = productSlice.actions;
export const productReducer = productSlice.reducer;
