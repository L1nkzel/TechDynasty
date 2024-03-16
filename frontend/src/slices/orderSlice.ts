// orderIdSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { OrderType } from '../types';

export const orderSlice = createSlice({
  name: 'order',
  initialState: null as OrderType | null,
  reducers: {
    setOrder: (state, action) => {
      return action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;


export default orderSlice.reducer;