import { createSlice } from "@reduxjs/toolkit";

//files
import { Media } from "../../features/interfaces";

const mediasSlice = createSlice({
  name: "medias",
  initialState: {
    medias: [] as Media[],
  },
  reducers: {
    addMedias(state, action: { payload: Media[] }) {
      state.medias = action.payload;
    },
  },
});

export const { addMedias } = mediasSlice.actions;

export default mediasSlice.reducer;
