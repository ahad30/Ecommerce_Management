import { configureStore } from '@reduxjs/toolkit'
import ModalSlice from '../Modal/ModalSlice';
import loadingSlice from '../loading/loadingSlice';
import baseApi from "../Api/baseApi";


const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    modal: ModalSlice,
    loading: loadingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export default store;
export const useAppDispatch = () => store.dispatch;
export const useAppSelector = (selector) => selector(store.getState());