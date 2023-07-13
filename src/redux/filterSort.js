import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     searchedValue: "",
     sortedValue: "",
};

const filterSortSlice = createSlice({
     name: 'search',
     initialState,
     reducers: {
          searchItem(state, action) {
               return {
                    ...state,
                    searchedValue: action.payload,
               };
          },
          sortOption(state, action) {
               return {
                    ...state,
                    sortedValue: action.payload,
               };
          }
     }
})

export default filterSortSlice.reducer;
export const { searchItem, sortOption } = filterSortSlice.actions;
