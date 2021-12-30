import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import optionsReducer from '../features/counter/optionsSlice';
import updateDataSlice from '../features/counter/updateDataSlice';
import likesUsers from '../features/counter/likesSlice';
import suggerensUser from '../features/counter/suggerensUser';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    options: optionsReducer,
    newDataUser: updateDataSlice,
    likesUser: likesUsers,
    suggerensUser: suggerensUser
  },
});
