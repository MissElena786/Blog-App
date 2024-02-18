// import Express, { application }  from "express";
import express from 'express'
import cookieParser from 'cookie-parser';
import upload from '../middelware/multer.middelware.js';
import { addUser, getAllUser, login, logout, getProfile } from '../Controllers/user.controllers.js';
import errorMiddleware from "../middelware/error.middelware.js"

const Routes = express.Router()
const app = express()
import cors from "cors"

app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors({
   origin : "*",
   credentials : true,

   // withCredentials : true,
   optionsSuccessStatus: 200

}))
app.use(errorMiddleware);


Routes.post("/register", upload.single("file"), addUser)
Routes.post("/login", login )
Routes.get("/logout", logout )
// // Routes.get("/me", isLoggedIn, getProfile )
Routes.get('/me',  getProfile);
Routes.post('/all-users',  getAllUser);
// Routes.post('/forgot-p',  forgot_Password);
// Routes.post('/verify-otp',  VarifyOtp);
// Routes.post('/change-password',  changePassword);
// Routes.post('/add-address',  AddAddress);
// Routes.post('/razorpay',  RazorpayPayment);
// Routes.post('/payment/success',  paymentSuccess);
// Routes.post('/my-orders',  fetchAlloreders);



export  default Routes
