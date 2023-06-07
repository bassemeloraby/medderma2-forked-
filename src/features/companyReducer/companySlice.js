import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companiesService from "./companyService";

const { getCompanies, addCompany, deleteCompanies, updateCompanies } =
  companiesService;

//get all companies
export const getComps = createAsyncThunk("comps/getComps", getCompanies);

//add company
export const addComp = createAsyncThunk(
  "comps/addComp",
  async (companyName, thunkAPI) => {
    try {
      return await addCompany(companyName);
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

//delete company
export const deleteComp = createAsyncThunk(
  "comps/deleteComp",
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
      .addCase(addComp.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComp.fulfilled, (state, action) => {
        state.loading = false;
        state.comps.push(action.payload);
      })
      .addCase(addComp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteComp.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComp.fulfilled, (state, action) => {
        state.loading = false;
        state.comps = state.comps.filter(
          (comp) => comp._id !== action.payload._id
        );
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
      })
      .addCase(updateComp.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      });
  },
});

export default companySlice.reducer;
