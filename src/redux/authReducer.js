import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      userName: "",
      avatar: "",
      email: "",
      subscribers: [],
      subscriptions: [],
      favoriteFilm: [],
      favGenres: [],
      favActors: [],
    },
    refresh: false,
    openNotification: false,
    userList: [],
    notifications: [],
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setRefresh(state, action) {
      state.refresh = action.payload;
    },
    setOpenNotification(state, action) {
      state.openNotification = action.payload;
    },
    setUserList(state, action) {
      state.userList = action.payload;
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    },
  },

});
export const { setUser, setRefresh, setOpenNotification, setUserList, setNotifications } = authSlice.actions;
export default authSlice.reducer;
