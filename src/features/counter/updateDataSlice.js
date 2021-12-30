import { createSlice } from '@reduxjs/toolkit';

export const updateDataSlice = createSlice({
    name: 'update',
    initialState: {
      newData: 0
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      updateData: (state, action) => {
    
        state.newData = action.payload;
      }
    },
  });
  
  export const { updateData } = updateDataSlice.actions;
  
  export const selectCount = (state) => state.counter.newData;
  
  
  export default updateDataSlice.reducer;