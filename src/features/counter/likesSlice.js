import { createSlice, current} from '@reduxjs/toolkit';

export const likesSlice = createSlice({
    name: 'likes',
    initialState: {
      likes: []
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
      likes: (state, action) => {
        //state.likes = action.payload;
        const { payload } = action;
        state.likes = [...state.likes, payload];
      },
      deleteLikes: (state, action) => {
        const { payload } = action;
        console.log(action.payload.payload._idBook)
        const { likes } = current(state);
        likes.filter(book => console.log(book.payload._idBook))
        state.likes = likes.filter(book => book.payload._idBook !== payload.payload._idBook);
      },
      deleteAllLikes: (state, action) => {
        state.likes = [];
      }
    },
  });
  
  export const { likes, deleteLikes, deleteAllLikes } = likesSlice.actions;
  
  export const selectCount = (state) => state.counter.likes;
  
  
  export default likesSlice.reducer;