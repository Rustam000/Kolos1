import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEditDistributorSlice = createAsyncThunk(
    "editDistributor/fetchEditDistributorSlice",
    async (_, thunkAPI) => {
      try {
        // Ваш код для выполнения GET-запроса для получения данных дистрибьютора
        // Например, использование axios:
        const response = await axios.post("http://51.20.115.221/api/v1/distributor/");
        return response.data;
      } catch (error) {
        console.warn(error);
        throw error;
      }
    }
  );

const initialState = {
    editDistributor: [],
    fullName: "",
    region: "",
    inn: "",
    address: "",
    actualAddress: "",
    passportSeriesAndNumber: "",
    issuedBy: "",
    issueDate: "",
    expiryDate: "",
    phoneNumber1: "",
    phoneNumber2: "",
}

export const editDistributorSlice = createSlice({
    name: "editDistributor",
    initialState,
    reducers: {
      setFullName: (state, action) => {
        state.fullName = action.payload;
      },
      setRegion: (state, action) => {
        state.region = action.payload;
      },
      setInn: (state, action) => {
        state.inn = action.payload;
      },
      setAddress: (state, action) => {
        state.address = action.payload;
      },
      setActualAddress: (state, action) => {
        state.actualAddress = action.payload;
      },
      setPassportSeriesAndNumber: (state, action) => {
        state.passportSeriesAndNumber = action.payload;
      },
      setIssuedBy: (state, action) => {
        state.issuedBy = action.payload;
      },
      setIssueDate: (state, action) => {
        state.issueDate = action.payload;
      },
      setExpiryDate: (state, action) => {
        state.expiryDate = action.payload;
      }, 
      setPhoneNumber1: (state, action) => {
        state.phoneNumber1 = action.payload;
      },
      setPhoneNumber2: (state, action) => {
        state.phoneNumber2 = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchEditDistributorSlice.fulfilled, (state, action) => {
        state.editDistributor = action.payload;
      });
    },
  });
  


export const editDistributorReducer = editDistributorSlice.reducer;
export const editDistributorActions = editDistributorSlice.actions;