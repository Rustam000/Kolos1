import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosPrivate } from '../api/axiosPrivate'
import { axiosDummy } from "../api/axiosDummy";

export const getDistributorById = createAsyncThunk(
  "profile/getDistributorById",
  async (distributorId, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/distributors/${distributorId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchSalesHistory = createAsyncThunk(
  "profile/fetchSalesHistory",
  async ({ distributorId, queryParams }, thunkAPI) => {
    try {
      const response = await axiosDummy.get(`/distributor/orders/${distributorId}`,{params:queryParams});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// New thunk for fetching returns history
export const fetchReturnsHistory = createAsyncThunk(
  "profile/fetchReturnsHistory",
  async ({ distributorId, queryParams }, thunkAPI) => {
    try {
      const response = await axiosDummy.get(`/distributor/returns/${distributorId}`,{params:queryParams});
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const initialState = {
  distributorInfo: {
    name: "...",
    inn: "...",
    region: "...",
    contact1: "...",
    contact2: "...",
  },
  category:'',
  startDate:'',
  endDate:'',
  salesHistory: [],
  returnsHistory: [],
  historySales:'',
  isLoading: false,
  error: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSales:(state, action) => {
      state.historySales = action.payload;
    },
    setStartDate:(state,action) => {
      state.startDate = action.payload;
    },
    setEndDate:(state,action) => {
      state.endDate = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getDistributorById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDistributorById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.distributorInfo = action.payload;
      })
      .addCase(getDistributorById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Не удалось загрузить данные о дистрибьюторе";
      });

      builder
      .addCase(fetchSalesHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSalesHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesHistory = action.payload;
      })
      .addCase(fetchSalesHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Не удалось получить данные историй продаж";
      });

      builder
      .addCase(fetchReturnsHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReturnsHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.returnsHistory = action.payload;
      })
      .addCase(fetchReturnsHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Не удалось получить данные возврата продаж";
      });
  },
});

export const profileReducer = profileSlice.reducer;
export const profileActions = profileSlice.actions;

