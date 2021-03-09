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
      users.isAuth = true;
      users.loading = false;
    },
  },
});

export const { usersRecieved, userAuthed } = usersSlice.actions;

export default usersSlice.reducer;
