import { createSlice } from "@reduxjs/toolkit";

const languageReducer = createSlice({
  name: "language",
  initialState: {
    currentLanguage: "en",
  },
  reducers: {
    toggleLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { toggleLanguage } = languageReducer.actions;

export default languageReducer.reducer;
