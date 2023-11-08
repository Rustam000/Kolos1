import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDistributorCredentials = createAsyncThunk(
  "order/fetchDistributorCredentials",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `http://51.20.115.221/api/v1/distributors/${id}`,
    );
    return response.data;
  },
);

export const getWarehouseItems = createAsyncThunk(
  "order/getWarehouseItems",
  async (queryParams, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jwt-authentication-beryl.vercel.app/api/warehouse/`,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  search: "",
  items: [],
  distributor: {
    name: "...",
    inn: "...",
    region: "...",
    contact1: "...",
    contact2: "...",
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDistributorCredentials.fulfilled, (state, action) => {
        state.distributor = action.payload;
      })
      .addCase(fetchDistributorCredentials.rejected, (state, action) => {
        console.log("fail");
        console.log(action);
      })
      .addCase(getWarehouseItems.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
