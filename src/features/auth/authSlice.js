import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const userExist = JSON.parse(localStorage.getItem("user"))

 const authSlice = createSlice({
    name : 'auth',
    initialState: {
         user : userExist || null,
         isLoading : false,
         isError :false,
         isSuccess : false,
         message : "",
    },
    reducers: {},

    extraReducers : (builder) => {
      builder
      .addCase(registerUser.pending , (state, action) => {
          state.isLoading = true ;
          state.isError = false;
          state.isSuccess = false
          state.message= "";
      })
      .addCase(registerUser.fulfilled , (state, action) => {
         state.isLoading = false ;
         state.isError = false;
         state.isSuccess = true;
         state.user = action.payload;
         state.message= "";
     })
     .addCase(registerUser.rejected , (state, action) => {
      state.isLoading = false ;
      state.isError = true;
      state.isSuccess = false;
      state.message = action.payload
  })

  .addCase(loginUser.pending , (state, action) => {
   state.isLoading = true ;
   state.isError = false;
   state.isSuccess = false
   state.message= "";
})
.addCase(loginUser.fulfilled , (state, action) => {
  state.isLoading = false ;
  state.isError = false;
  state.isSuccess = true;
  state.user = action.payload;
  state.message= "";
})
.addCase(loginUser.rejected , (state, action) => {
state.isLoading = false ;
state.isError = true;
state.isSuccess = false;
state.message = action.payload
})

.addCase(LogoutUser.fulfilled , (state, action) => {
   state.isLoading = false ;
   state.isError = false;
   state.isSuccess = false;
   state.user = null;
   state.message= "";
 })

    }
 });

 export default authSlice.reducer;

//  Register User

 export const registerUser = createAsyncThunk(
   "AUTH/REGISTER" , 
   async (formData) => {
      try {
         return await authService.register(formData)
      } catch (error) {
         const message = error.response.data.message
         thunkAPI.rejectwithValue(message);
      }
   });

   // Login User
   export const loginUser = createAsyncThunk(
      "AUTH/LOGIN" , 
      async (formData) => {
         try {
            return await authService.login(formData, thunkAPI)
         } catch (error) {
             const message = error.response.data.message
             thunkAPI.rejectwithValue(message);
         }
      });
      
   // Logout User
      export const LogoutUser = createAsyncThunk(
         "AUTH/LOGOUT" , 
         async (formData) => {
            try {
              localStorage.removeItem("user")
            } catch (error) {
               const message = error.response.data.message
               thunkAPI.rejectwithValue(message);
            }
         });