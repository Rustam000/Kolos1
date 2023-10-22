import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchItems = createAsyncThunk(
  "warehouse/fetchItems",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jwt-authentication-beryl.vercel.app/api/warehouse`,
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  products: [],
};

export const warehouseSlice = createSlice({
  name: "warehouse",
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      if (action.payload.login === "dev" && action.payload.password === "dev") {
        state.error = null;
        state.user = "dev";
      } else {
        state.user = null;
        state.failedAttempts += 1;
        state.error = state.failedAttempts >= 4 ? "access_denied" : "try_again";
      }
    },
    clearError: (state) => {
      if (state.error === "access_denied") return state;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const warehouseReducer = warehouseSlice.reducer;
export const warehouseActions = warehouseSlice.actions;
