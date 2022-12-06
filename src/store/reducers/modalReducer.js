import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: false,
    modalContent: null,
  },
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setModalContent: (state, action) => {
      state.modalContent = action.payload;
    },
    clearModalContent: (state) => {
      state.modalContent = null;
    },
  },
});

export const { toggleModal, setModalContent, clearModalContent } =
  modalSlice.actions;

export default modalSlice.reducer;
