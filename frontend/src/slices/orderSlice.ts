// orderIdSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: null,
  reducers: {
    setOrder: (state, action) => {
      return action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;


export default orderSlice.reducer;