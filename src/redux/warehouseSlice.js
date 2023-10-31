import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWarehouseItems = createAsyncThunk(
  "warehouse/fetchWarehouseItems",
  async (queryParams, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://51.20.115.221/api/v1/product/?limit=9999`,
        {
          params: queryParams,
        },
      );
      return response.data.results;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const fetchWarehouseOptions = createAsyncThunk(
  "warehouse/fetchWarehouseOptions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jwt-authentication-beryl.vercel.app/api/warehouse/options`,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  search: "",
  category: "all",
  condition: "norm",
  items: [],
  options: {
    search: [],
    category: [{ value: "all", label: "---" }],
    condition: [{ value: "norm", label: "---" }],
  },
  isLoading: false,
  error: null,
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
    builder.addCase(fetchWarehouseItems.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchWarehouseItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    });
    builder.addCase(fetchWarehouseItems.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    ///////////////////////////////////////////////////////////
    builder.addCase(fetchWarehouseOptions.fulfilled, (state, action) => {
      state.options = action.payload;
    });
  },
});

export const warehouseReducer = warehouseSlice.reducer;
export const warehouseActions = warehouseSlice.actions;
