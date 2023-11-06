import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWarehouseItems = createAsyncThunk(
  "warehouse/fetchWarehouseItems",
  async (queryParams, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://51.20.115.221/api/v1/products/?limit=10000`,
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

const initialState = {
  search: "",
  category: "",
  state: "Valid",
  items: [],
  options: {
    search: [],
  },
  isLoading: false,
  error: null,
};

export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setCondition: (state, action) => {
      state.state = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearData: (state, action) => {
      state.items = [];
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
  },
});

export const warehouseReducer = warehouseSlice.reducer;
export const warehouseActions = warehouseSlice.actions;
