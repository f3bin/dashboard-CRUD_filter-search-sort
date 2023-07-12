import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("users/get", async () => {
  const response = await fetch("http://localhost:3031/users");
  const result = await response.json();
  return result;
});

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId) => {
    await fetch(`http://localhost:3031/users/${userId}`, {
      method: "DELETE",
    });
    return userId;
  }
);

export const addUser = createAsyncThunk("users/add", async (user) => {
  const response = await fetch("http://localhost:3031/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const result = await response.json();
  return result;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    loading: false,
    error: null,
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = "";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error = action.error.message;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((item) => item.id !== action.payload);
      })
    
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
  ;
  },
});

export default userSlice.reducer;

