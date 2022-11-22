import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    list: [],
  },
  reducers: {
    addItemToWishlist: (state, action) => {
      const isItemExist = state.list.find(
        (item) => item.id === action.payload.id
      );
      if (isItemExist) return;
      state.list.push(action.payload);
    },
    removeItemFromWishlist: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
