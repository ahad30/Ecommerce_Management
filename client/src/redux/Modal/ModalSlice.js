import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditModalOpen: false,
  isAddModalOpen: false,
  isDeleteModalOpen: false,
  isViewModalOpen: false,
  isCustomerModalOpen: false,
  isProductModalOpen: false,
  isCalculatorModalOpen: false
//   isHomeCategorySidebarOpen: false,
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsEditModalOpen: (state) => {
      state.isEditModalOpen = !state.isEditModalOpen;
    },
    setIsAddModalOpen: (state) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    setIsDeleteModalOpen: (state) => {
      state.isDeleteModalOpen = !state.isDeleteModalOpen;
    },
    setIsViewModalOpen: (state) => {
      state.isViewModalOpen = !state.isViewModalOpen;
    },
    setIsCustomerModalOpen: (state) => {
      state.isCustomerModalOpen = !state.isCustomerModalOpen;
    },
    setIsProductModalOpen: (state) => {
      state.isProductModalOpen = !state.isProductModalOpen;
    },
    setIsCalculatorModalOpen: (state) => {
      state.isCalculatorModalOpen = !state.isCalculatorModalOpen;
    },

    // setIsHomeCategorySidebarOpen: (state) => {
    //   state.isHomeCategorySidebarOpen = !state.isHomeCategorySidebarOpen;
    // },
  },
});

export const {
  setIsAddModalOpen,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setIsViewModalOpen,
  setIsCustomerModalOpen,
  setIsProductModalOpen,
  setIsCalculatorModalOpen
//   setIsHomeCategorySidebarOpen,
} = ModalSlice.actions;

export default ModalSlice.reducer;
