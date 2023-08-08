import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import pcBuildReducer from "./features/pcBuild/pcBuildSlice";
const store = configureStore({
  reducer: {
    pcBuild: pcBuildReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
