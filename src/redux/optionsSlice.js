import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOptions = createAsyncThunk(
  "options/fetchOptions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://jwt-authentication-beryl.vercel.app/api/options`,
      );
      return response.data;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  options: {
    category: [{ value: "", label: "---" }],
    unit: [{ value: "", label: "---" }],
    region: [{ value: "", label: "---" }],
  },
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOptions.fulfilled, (state, action) => {
      state.options = action.payload;
    });
    builder.addCase(fetchOptions.rejected, (state, action) => {
      console.warn("Failed to fetch options");
    });
  },
});

export const optionsReducer = optionsSlice.reducer;
export const optionsActions = optionsSlice.actions;
