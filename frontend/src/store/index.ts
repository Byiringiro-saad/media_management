import { configureStore } from "@reduxjs/toolkit";

//slices
import mediasSlice from "./slices/medias";

const store = configureStore({
  reducer: {
    medias: mediasSlice,
  },
});

export default store;
