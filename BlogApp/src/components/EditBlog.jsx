import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

import { blogFindByID, updateBlog } from '../store/blogSlice';
import toast from 'react-hot-toast';
useDispatch

function EditBlog() {

   const _id = useParams()
   const id  = _id?.id
   
   console.log(id)
   const [previewImage, setPreviewImage] = useState("");
   const dispatch = useDispatch()
   const navigate = useNavigate()
 const [blogData, setBlogData] = useState({})
   const [updateData, setUpdateData] = useState({
       title : "",
       description : "",
       avatar: "",
     
   });
 
   function handleUserInput(e) {
       const {name, value} = e.target;
       setUpdateData({
           ...updateData,
           [name]: value
       })
   }
 
   function getImage(event) {
       event.preventDefault();
       const uploadedImage = event.target.files[0];
 
       if(uploadedImage) {
           setUpdateData({
               ...updateData,
               avatar: uploadedImage
           });
           const fileReader = new FileReader();
           fileReader.readAsDataURL(uploadedImage);
           fileReader.addEventListener("load", function () {
               setPreviewImage(this.result);
           })
       }
   }

   const load = async () => {
    const res = await dispatch(blogFindByID(id));
    setBlogData(res?.payload?.blog);
  };
 
  console.log(blogData)
   async function editBlog(event) {
       event.preventDefault();
       // if(!signupData.email || !signupData.password || !signupData.fullName || !signupData.avatar) {
       if(!updateData.title || !updateData.description || !updateData.avatar )  {
           toast.error("Please fill all the details");
           return;
       } 
 
       const formData = new FormData();
       formData.append("title", updateData.title);
       formData.append("description", updateData.description);
       formData.append("file", updateData.avatar);
 
       // dispatch create account action
       const response = await dispatch(updateBlog({id : id , data : formData}));
       
       
       console.log(response)
       if(response?.payload?.success == true){
       
       setUpdateData({
           title : "",
           description : "",
           avatar: "",
        });
        setPreviewImage("");
        navigate("/")
    }

    
}
useEffect(()=>{
    load()
}, [])
  return (
  < div className='bg-slate-100 min-h-screen  w-full pt-40   '>
    <Navbar/>
    <div className="flex w-[100%]  rounded justify-center m-auto">
     

       <div className='flex items-center justify-center flex-col p-5 slate-500 shadow-2xl w-[50%] '>
          <h1 className=' md:text-4xl mb-6'>Update Blog</h1>
          <form onSubmit={editBlog} className=' flex flex-col justify-center items-center  w-full' >
          {/* <div className="avatar flex justify-center"> */}
  <label htmlFor="image_uploads">
    
                             {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
                        ) : (
    <img src={blogData?.secure_url} className='cursor-pointer w-24 h-24 rounded-full border ' /> 
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
           placeholder="title.." className="input input-bordered input-sm w-full m-3 max-w-xs"
           // required
           name='title'
           onChange={handleUserInput}
           value={updateData.title}
           />
          <input type="text"
           placeholder="Discription.." className="input input-bordered input-sm w-full m-3 max-w-xs"
           // required
           name='description'
           onChange={handleUserInput}
           value={updateData.description}
           />

          <button  className="btn btn-active  tracking-[0.1rem] lg:text-lg bg-sky-500 font-bold letter-space m-6 text-white hover:bg-sky-400 transition-all ease-in-out ">Update</button>
          </form>
       </div>
    </div>
 </div>
  )
}

export default EditBlog
