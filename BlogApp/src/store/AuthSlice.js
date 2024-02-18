import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { baseUrl } from "../helpers/baseUrl";
import toast from "react-hot-toast";

const initialState = {

   isLoggedIn: localStorage.getItem('isLoggedIn') || false,
   role: localStorage.getItem('role') || "",
   data: localStorage.getItem('data') != undefined ?  JSON.parse(localStorage.getItem('data')) : {},

};


export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
   try {
       const res =  toast.promise(
             axios.post(baseUrl + "/user/register", data),  
        {
           loading: "Wait! creating your account",
           success: (data) => {
               return data?.data?.message;
           },
           error: (error)=>{
            console.log(error)
            return error?.response?.data?.message
            //    toast.error(error?.response?.data?.message);
           }
       });
       return res?.data
   } catch(error) {
       toast.error(error?.response?.data?.message);
   }
})


export const login = createAsyncThunk('/blog/login', async (data) => {
   try {
       const response = await toast.promise(
         axios.post( baseUrl + '/user/login', data),
           {
               loading: 'Wait! authentication in progress...',
               success: (data) => {
                   console.log("data", data);
                   // Assuming data is an object with a 'message' field
                   return data?.data?.message;
               },
            //    error : "failed to login"
               error: (error) => {
                  console.log( error)
                   return error?.response?.data?.message;
               }
           }
       );
      //  console.log(response)
       return response; // Return the response from toast.promise
   } catch (error) {
       toast.error(error?.response?.data?.message);
      //  throw error; // Re-throw the error to indicate that the action failed
   }
});


export const logout = createAsyncThunk("/auth/logout", async () => {
   try {
       const res = await toast.promise(
           axios.get(baseUrl + "/user/logout"),
            {
           loading: "Wait! logout in progress...",
           success: (data) => {
           
               return data?.data?.message;
           },
           error: "Failed to log out"
       });
       return res
   } catch(error) {
       toast.error(error?.response?.data?.message);
   }
});


const authSliceReducer  = createSlice({
   name : "auth",
   initialState,
   reducers :{},
   extraReducers : (builder) => {
        
      builder
      .addCase(login.fulfilled, (state, action) => {
         const userData = JSON.stringify(action?.payload?.data);
         localStorage.setItem("data", userData);
         localStorage.setItem("isLoggedIn", true);
         localStorage.setItem("role", action?.payload?.data?.user?.role);
         console.log(action?.payload);
         state.isLoggedIn = true;
         state.data = action?.payload?.data?.user;
         state.role = action?.payload?.data?.user?.role;
     }) 
     .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
    })
      }
})

export default authSliceReducer.reducer
