import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
  
      state.user = action.payload;
    }
  },
});

export const { login } = counterSlice.actions;

export const selectCount = (state) => state.counter.user;


export default counterSlice.reducer;
