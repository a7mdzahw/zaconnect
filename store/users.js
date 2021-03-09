import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: { list: [], loading: true, current: null, isAuth: false },
  reducers: {
    usersRecieved: (users, action) => {
      users.list = action.payload;
      users.loading = false;
    },
    userAuthed: (users, action) => {
      users.current = action.payload;
      if (!action.payload) users.isAuth = false;
      else users.isAuth = true;
      users.loading = false;
    },
  },
});

export const { usersRecieved, userAuthed } = usersSlice.actions;

export default usersSlice.reducer;
