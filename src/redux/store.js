import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import filterSortReducer from './filterSort'


export const Store = configureStore({
     reducer: {
          users: userReducer,
          search:filterSortReducer,
     }
});