import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./AuthSlice.js"
import blogSlice from "./blogSlice.js"


const store = configureStore({
       reducer : {
         auth : authSlice,
         blogs : blogSlice
       },
       middleware: (getDefaultMiddleware) =>
       getDefaultMiddleware({
         serializableCheck: false,
       }),
       devTools: true
   
})

export default store