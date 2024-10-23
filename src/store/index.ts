import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducer";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
