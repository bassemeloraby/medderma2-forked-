import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companiesService from "./companyService";

const { getCompanies, updateCompanies , deleteCompanies } = companiesService;

export const getComps = createAsyncThunk("comps/getComps", getCompanies);

//delete company
export const deleteComp = createAsyncThunk(
  'comps/deleteComp',
  async (_id, thunkAPI) => {
    try {
      return await deleteCompanies(_id);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// update
export const updateComp = createAsyncThunk(
  "comps/updateComps",
  async ({ id, companyName }, thunkAPI) => {
    try {
      return await updateCompanies({ id, companyName });
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const companySlice = createSlice({
  name: "comps",
  initialState: {
    comps: [],
    loading: false,
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
      })
      .addCase(deleteComp.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComp.fulfilled, (state, action) => {
        state.loading = false;
        state.comps = state.comps.filter(
          (comp) => comp._id !== action.payload._id
        );
        return state;
      })
      .addCase(deleteComp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(updateComp.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateComp.fulfilled, (state, action) => {
        state.loading = false;
        const { companyName, id } = action.payload;

        const uu = state.comps.find((comp) => comp._id === id);
        if (uu) {
          uu.companyName = companyName;
        }
        return state;
      })
      .addCase(updateComp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export default companySlice.reducer;
