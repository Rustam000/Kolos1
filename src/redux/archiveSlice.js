import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchArchiveItems = createAsyncThunk(
  "archive/fetchArchiveItems",
  async (target, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://51.20.115.221/api/v1/${target}/archive/?limit=9999`,
      );
      return response.data.results;
    } catch (error) {
      console.warn(error);
    }
  },
);

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const archiveSlice = createSlice({
  name: "archive",
  initialState,
  reducers: {
    clearData: (state, action) => {
      state.items = [];
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArchiveItems.pending, (state, action) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchArchiveItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    });
    builder.addCase(fetchArchiveItems.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const archiveReducer = archiveSlice.reducer;
export const archiveActions = archiveSlice.actions;
