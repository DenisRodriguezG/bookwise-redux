import { createSlice } from '@reduxjs/toolkit';

export const suggerensUser = createSlice({
    name: 'history',
    initialState: {
      movement: []
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      historyUser: (state, action) => {
          const { payload } = action;
        state.movement = [...state.movement, payload];
      },
      deleteHistory: (state, action) => {
          state.movement = [];
      }
    },
  });
  
  export const { historyUser, deleteHistory } = suggerensUser.actions;
  
  export const selectCount = (state) => state.counter.movement;
  
  
  export default suggerensUser.reducer;