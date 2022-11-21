import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategoriesAndDocuments } from "../../utils/firebase";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, thunkApi) => {
    try {
      const result = await getAllCategoriesAndDocuments();
      return result;
    } catch (error) {
      toast.error(error);
      return thunkApi.rejectWithValue(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductCategories: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { setProductCategories } = productsSlice.actions;

export default productsSlice.reducer;
