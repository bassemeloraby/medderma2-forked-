import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companiesService from "./companyService";

const { getCompanies } = companiesService;

export const getComps = createAsyncThunk("comps/getComps", getCompanies);

const companySlice = createSlice({
  name: "comps",
  initialState: {
    comps: [],
    loading: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComps.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getComps.fulfilled, (state, action) => {
        state.loading = false;
        state.comps = action.payload;
      })
      .addCase(getComps.rejected, (state, action) => {
        state.loading = false;
      });
  }
});

export default companySlice.reducer;
