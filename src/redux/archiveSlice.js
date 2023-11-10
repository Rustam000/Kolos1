import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../api/axiosPrivate";

export const fetchArchiveItems = createAsyncThunk(
  "archive/fetchArchiveItems",
  async (entity) => {
    try {
      const response = await axiosPrivate.get(
        `/${entity}/archive/?limit=10000`,
      );
      return response.data.results;
    } catch (error) {
      console.warn(error);
    }
  },
);

export const restoreItemById = createAsyncThunk(
  "archive/restoreItemById",
  async ({ entity, id }) => {
    try {
      const response = await axiosPrivate.delete(`/${entity}/archive/${id}/`);
      return response.data;
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
