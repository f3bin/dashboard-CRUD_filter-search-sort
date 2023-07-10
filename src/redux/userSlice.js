import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
const initialState = {
     loading: false,
     error: null,
     users: [],
};

export const getUsers = createAsyncThunk('users/get', async () => {
     const response = await fetch('http://localhost:3031/users')
     const result = await response.json();
     return result;
  
})

const userSlice = createSlice({
     name:"users",
     initialState,
     reducers:{ },
     extraReducers:(builder) => {
          builder.addCase(getUsers.pending, (state) => {
               state.loading = true;
          })

          builder.addCase(getUsers.fulfilled, (state, action) => {
               state.loading =false;
               state.users = action.payload;
               state.error = "";
          })

          builder.addCase(getUsers.rejected,(state,action)=>{
               state.loading= false;
               state.users = [];
               state.error = action.error.message;
          })
     }

})

export default userSlice.reducer;