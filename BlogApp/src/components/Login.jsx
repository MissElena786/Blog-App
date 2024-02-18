import React, { useState } from 'react'
import girl from "../assets/girl.jpg"
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
import { login } from '../store/AuthSlice';
import {useDispatch} from "react-redux"

function Login() {


   
   const dispatch = useDispatch()
   const navigate = useNavigate();

   const STATE = [
       localStorage.getItem("data", {}),
       localStorage.getItem("role", "")

   ]

   const [loginData, setLoginData] = useState({
       email: "",
       password: "",
   });
   const [token, setToken]  = useState()

   function handleUserInput(e) {
       const {name, value} = e.target;
       setLoginData({
           ...loginData,
           [name]: value
       })
   }

   async function onLogin(event) {
       event.preventDefault();
       if(!loginData.email || !loginData.password) {
           toast.error("Please fill all the details");
           return;
       }

       // dispatch create account action
       const response = await dispatch(login(loginData));
       console.log("...", response)
       if(response?.payload?.data?.success == true){
           const token = response?.payload?.data?.token
           console.log(token)
           setToken(token)
           navigate("/")
        
       }
      
   }

function setCookie(name, value, daysToExpire) {
   const expirationDate = new Date();
   expirationDate.setDate(expirationDate.getDate() + daysToExpire);
 
   const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
 
   document.cookie = cookieString;
 }
 
//  Example usage
 setCookie('token', token,  1);

   return (
      <div className='bg-slate-100 min-h-screen  w-full pt-40   '>
         <Navbar/>
         <div className="flex w-[80%] shadow-xl rounded justify-center m-auto">
            <div className='w-[50%]'>
               <img src={girl} className='object-cover' alt="img" />
            </div>

            <div className='flex items-center justify-center flex-col p-5 slate-500 w-[50%]'>
               <h1 className=' md:text-4xl mb-6'>Login</h1>
               <form onSubmit={onLogin} >
               <input type="email"
                placeholder="email" className="input input-bordered input-sm w-full m-3 max-w-xs"
                // required
                name='email'
                onChange={handleUserInput}
                value={loginData.email}
                />
               <input 
                //  required
                 name='password'
                 onChange={handleUserInput}
                 value={loginData.password}
               type="password" placeholder="password" className="input input-bordered input-sm w-full max-w-xs" />
               <button  className="btn btn-active  tracking-[0.1rem] lg:text-lg bg-sky-500 font-bold letter-space m-6 text-white hover:bg-sky-400 transition-all ease-in-out ">Login</button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default Login
