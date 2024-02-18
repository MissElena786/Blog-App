import React from 'react'
import logo from "../assets/MmdcmmmcH.png"
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/AuthSlice'


function Navbar() {
  const dispatch = useDispatch()

   const Logout = async  ()=>{
      const out = await dispatch(logout())
      // console.log(out)
   }

   const isLoggedIn = useSelector((state)=> state?.auth?.isLoggedIn)
   // console.log(isLoggedIn)

  return (
   <header className='flex justify-between items-center pl-[2rem] pr-[2rem] p-2 header z-50' >
      <div>
         <img  className='w-20 rounded-full' src={logo} alt="" />
      </div>
      {/* <div>
      <input type="text" placeholder="Search..." className="input bg-gray-200  input-bordered input-sm md:w-[15rem] max-w-xs" />
      </div> */}
      <div>
         <ul className='flex'>
            <Link to="/"> <li className='m-2 text-blue-50 bg-slate-900 px-4 py-2  rounded'>Home</li></Link>
            <Link to="/about"> <li className='m-2  text-blue-50  bg-slate-900 px-4 py-2  rounded'>About</li></Link>
            <Link> <li className='m-2  text-blue-50  bg-slate-900 px-4 py-2  rounded'>
            <div className="dropdown dropdown-bottom dropdown-end">
  <div tabIndex={0} role="button" className=" ">Your Activity</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu text-black mt-3  shadow bg-base-100 rounded-xl min-w-auto">
    <Link to="/profile "> <li><a>Profile</a></li></Link>
    <Link to="/likes"><li><a>Likes</a></li></Link>
    <Link to="/my-blogs "><li><a>MyBlogs</a></li></Link>
    {/* <Link><li><a>comments</a></li></Link> */}
  </ul>
</div>
    </li></Link>
         </ul>
       
      </div>
      <div>
         {
            isLoggedIn ? 
                 <button onClick={Logout} className="btn bg-success border-none">Logout</button>
            :
            <Link to="/login">  <button className="btn bg-success border-none">Login</button></Link>

         }
         <Link to="/signup">  <button className="btn ml-3 bg-success  border-none ">Register</button></Link>
      </div>

   </header>
  )
}

export default Navbar
