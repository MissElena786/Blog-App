import React, { useState } from 'react'
import "../app.css"
import Navbar from './Navbar'
import { useSelector } from 'react-redux'

function Profile() {

  const state = useSelector((state)=> state?.auth?.data?.user)
  // console.log(state)
  return (
    <div className='main min-h-screen p-20 pt-40 flex justify-center '>
      <Navbar/>
      <div className='card profile p-10 '>
      <div className="avatar w-24 self-center online mb-8">
      <div className="w-24 rounded-full">
        {state?.avatar ? 
           <img   src= { state.avatar}  /> 
           : 
           <img  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" /> 
        }
   

  </div>
</div>

<div className='card-body'>
   <div className='grid md:text-lg grid-cols-2 w-full text-center gap-x-20'>
 <p className='t'>Name </p>
 <p className='t'>{state?.name} </p>
 <p className=''>Role </p>
 <p className=''>{state?.role} </p>
 <p className=''>userID </p>
 <p className=''>{state?.user_id}</p>
   </div>
</div>


      </div>
        
    </div>
  )
}

export default Profile
