import { createSlice } from '@reduxjs/toolkit';

const loginRegisterSlice = createSlice({
  name: 'loginRegister',
  initialState: {
    isRegistered: false,
    open: false,
    redirectUrl: undefined,
  },
  reducers: {
    setIsRegistered: (state, action) => {
      state.isRegistered = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setIsRegistered, setOpen } = loginRegisterSlice.actions;

export default loginRegisterSlice.reducer;