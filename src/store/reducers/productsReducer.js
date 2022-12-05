import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllCategoriesAndDocuments,
  getAllProductsInCategory,
  getCategoriesPreview,
} from "../../utils/firebase";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  productsCategoriesPreview: [],
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

export const getProductsCategoriesPreview = createAsyncThunk(
  "products/fetchCategoriesPreview",
  async (_, thunkApi) => {
    try {
      const result = await getCategoriesPreview();
      return result;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const getProductsInCategory = createAsyncThunk(
  "products/fetchProductsCategory",
  async (categoryTitle, thunkApi) => {
    try {
      const result = await getAllProductsInCategory(
        `${categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1)}`
      );
      return result;
    } catch (error) {
      toast.error(error.message);
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
    setCategoriesPreview: (state, action) => {
      state.productsCategoriesPreview = action.payload;
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
    builder.addCase(getProductsCategoriesPreview.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsCategoriesPreview.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productsCategoriesPreview = action.payload;
    });
    builder.addCase(getProductsCategoriesPreview.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    builder.addCase(getProductsInCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsInCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsInCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
  },
});

export const { setProductCategories, setCategoriesPreview } =
  productsSlice.actions;

export default productsSlice.reducer;
