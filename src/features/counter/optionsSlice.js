import { createSlice } from '@reduxjs/toolkit';

export const optionsSlice = createSlice({
    name: 'options',
    initialState: {
      option: 0
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      options: (state, action) => {
    
        state.option = action.payload;
      }
    },
  });
  
  export const { options } = optionsSlice.actions;
  
  export const selectCount = (state) => state.counter.option;
  
  
  export default optionsSlice.reducer;