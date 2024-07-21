import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: {
    tempFilms: [],

  },
  reducers: {
    setTempFilms(state, action) {
      state.tempFilms = action.payload;
    },

  },

});
export const { setTempFilms } = listSlice.actions;
export default listSlice.reducer;
