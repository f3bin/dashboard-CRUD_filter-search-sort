import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSortSlice = createSlice({
     name: 'search',
     initialState,
     reducers: {
          searchItem(state, action) {
               return state = action.payload
          },
     }
})

export default filterSortSlice.reducer;
export const { searchItem } = filterSortSlice.actions;
