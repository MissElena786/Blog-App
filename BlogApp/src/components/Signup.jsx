import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../store/AuthSlice';
import Navbar from './Navbar'
import {useDispatch} from "react-redux"
function Signup() {
    
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [signupData, setSignupData] = useState({
      name: "",
      email: "",
      user_id: "",
      avatar: "",
      password : ""
  });

  function handleUserInput(e) {
      const {name, value} = e.target;
      setSignupData({
          ...signupData,
          [name]: value
      })
  }

  function getImage(event) {
      event.preventDefault();
      const uploadedImage = event.target.files[0];

      if(uploadedImage) {
          setSignupData({
              ...signupData,
              avatar: uploadedImage
          });
          const fileReader = new FileReader();
          fileReader.readAsDataURL(uploadedImage);
          fileReader.addEventListener("load", function () {
              setPreviewImage(this.result);
          })
      }
  }

  async function createNewAccount(event) {
      event.preventDefault();
      // if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
      if(!signupData.email || !signupData.password || !signupData.name || !signupData.user_id )  {
          toast.error("Please fill all the details");
          return;
      }

    //   if(!isEmail(signupData.email)) {
    //       toast.error("Invalid email id");
    //       return;
    //   }
 

      const formData = new FormData();
      formData.append("name", signupData.name);
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("user_id", signupData.user_id);
      formData.append("file", signupData.avatar);

      // dispatch create account action
      const response = await dispatch(createAccount(formData));

      console.log(response)
      if(response?.payload?.success == true)
          navigate("/login");

      setSignupData({
          name: "",
          email: "",
          password: "",
          avatar: "",
          user_id: ""
      });
      setPreviewImage("");
    

  }


  return (
    <div className='bg-slate-100 min-h-screen  w-full pt-40   '>
    <Navbar/>
    <div className="flex w-[100%]  rounded justify-center m-auto">
     

       <div className='flex items-center justify-center flex-col p-5 slate-500 shadow-2xl w-[50%] '>
          <h1 className=' md:text-4xl mb-6'>Signup</h1>
          <form onSubmit={createNewAccount} className=' flex flex-col justify-center items-center  w-full' >
          {/* <div className="avatar flex justify-center"> */}
  <label htmlFor="image_uploads">
    
                             {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" className='cursor-pointer rounded-full w-24' /> 
    )}

  </label>
  <input 
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="image_uploads"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />

          <input type="text"
           placeholder="Name.." className="input input-bordered input-sm w-full m-3 max-w-xs"
           // required
           name='name'
           onChange={handleUserInput}
           value={signupData.name}
           />
          <input type="email"
           placeholder="email" className="input input-bordered input-sm w-full m-3 max-w-xs"
           // required
           name='email'
           onChange={handleUserInput}
           value={signupData.email}
           />
           
           
            <input type="text"
           placeholder="user ID" className="input input-bordered input-sm w-full m-3 max-w-xs"
           // required
           name='user_id'
           onChange={handleUserInput}
           value={signupData.user_id}
           />
          <input 
           //  required
            name='password'
            onChange={handleUserInput}
            value={signupData.password}
          type="password" placeholder="password" className="input input-bordered input-sm w-full max-w-xs" />
          <button  className="btn btn-active  tracking-[0.1rem] lg:text-lg bg-sky-500 font-bold letter-space m-6 text-white hover:bg-sky-400 transition-all ease-in-out ">Signup</button>
          </form>
       </div>
    </div>
 </div>
  )
}

export default Signup
