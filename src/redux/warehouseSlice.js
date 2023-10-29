import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { kolosApi } from "../api/axios";

/* export const fetchItems = createAsyncThunk(
  "warehouse/fetchItems",
  async (_, thunkAPI) => {
    try {
      const response = await kolosApi.get(`/warehouse`);
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
); */
export const fetchItems = createAsyncThunk(
  "warehouse/fetchItems",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jwt-authentication-beryl.vercel.app/api/warehouse`,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  search: "",
  category: "",
  condition: "",
  items: [],
};

export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload.category;
    },
    setCondition: (state, action) => {
      state.condition = action.payload.condition;
    },
    setSearch: (state, action) => {
      state.search = action.payload.search;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const warehouseReducer = warehouseSlice.reducer;
export const warehouseActions = warehouseSlice.actions;
