import React, { useEffect, useState } from 'react'
import { IoMdHeart } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiCoinsFill, RiDeleteBin3Fill } from "react-icons/ri";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";

import { FiHeart } from "react-icons/fi";
import { createBlog, fetchAllBlog,  } from '../store/blogSlice';





import Navbar from './Navbar'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function Home() {

  const navigate = useNavigate()
  const blogs = useSelector((state)=> state?.blogs?.blogs)
  // console.log(blogs)

  const dispatch =  useDispatch ()

  const [previewImage, setPreviewImage] = useState("");
  const userId = useSelector((state)=> state?.auth?.data?.user?.user_id || state?.auth?.data?.user_id  )
  // console.log(userId)

  const [ blogData, setBlogData] = useState({
        title : "",
        description : "",
        user_id : userId,
        imageUrl : ""
        })


       
        function handleUserInput(e) {
          const {name, value} = e.target;
          setBlogData({
              ...blogData,
              [name]: value
          })
      }
      const BlogDescription = (id)=>{
        navigate(`/blog-description/${id}`)
     }


        const load = async()=>{
    const res = await dispatch(fetchAllBlog())
    // console.log(res)

  }

        function getBlogImage(event) {
          event.preventDefault();
          const uploadedImage = event.target.files[0];
    
          if(uploadedImage) {
              setBlogData({
                  ...blogData,
                  imageUrl: uploadedImage
              });
              const fileReader = new FileReader();
              fileReader.readAsDataURL(uploadedImage);
              fileReader.addEventListener("load", function () {
                  setPreviewImage(this.result);
              })
          }
      }

      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("description", blogData.description);
      formData.append("user_id", userId);
      formData.append("file", blogData.imageUrl);


  const CreateBlog = async ()=>{
    if(!blogData.title || !blogData.description){
      toast.error("all fields are mendatory")
    }
   const res = await dispatch(createBlog(formData))
  //  console.log("../",res)
   if(res?.payload?.success == true){
    setBlogData({
      title : "",
      description : "",
      user_id : userId,
      imageUrl : ""
    })
    // navigate("/")
   load()
  }  
  }
  


  useEffect(()=>{
    load()
  },[dispatch])
  return (
    <div className='main min-h-screen  p-20 pt-40 '>
      <main className='main relative'>
      <Navbar></Navbar>
      <div className='hero p-10 pb-24 rounded mb-48 '>
        <h1 className='text-4xl' >This is an Blog Webb Application</h1>
        Blog webb application where you can write your blog and see others blogs.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, rerum, odio beatae
        architecto iste pariatur nam, repellendus dolor sint voluptas ducimus aut.
        Dolorem id velit tenetur neque ducimus atque aperiam.
        <div className=' absolute bottom-2'>
          <a href='#blogs'>
           <button className=" px-5 py-3 rounded  m-2 text-white border-none  bg-gray-800 hover:bg-gray-950">  Get Started</button>
          </a>
          {/* <button className="  px-5 py-3 rounded  m-2 text-slate-900 font-bold border-none  bg-white  hover:bg-gray-300 transition-all ease-in-out">  CREATE BLOG <b>+</b></button> */}

          {/* The button to open modal */}
<label htmlFor="my_modal_7" className="btn">CREATE BLOG</label>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_7" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <div className='w-48 m-auto'>
    <img  className='w-48' src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="" />
    </div>
    {/* <h3 className="text-lg font-bold text-center ">Create Blog</h3> */}

    <div className='flex flex-col justify-center items-center'>
    <input type="text" value={blogData.title} onChange={handleUserInput}  name='title' placeholder="Title" className="input input-bordered input-md w-full max-w-xs m-2" />
    <input type="text" value={blogData.description}  onChange={handleUserInput} name="description" placeholder="Description" className="input input-bordered input-md w-full max-w-xs m-2" />
    <input type="file" onChange={getBlogImage}  className="file-input file-input-bordered file-input-md w-full max-w-xs  mt-4" />
    <button type='submit' onClick={CreateBlog} className=" px-5 py-3 rounded  m-2 text-white border-none  bg-gray-900 hover:bg-gray-950 mt-5"> Create Blog</button>




    </div>
  </div>
  <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
</div>
          {/* <button className="btn absolute bottom-2  btn-primary">Get Started</button> */}
        </div>

      

      </div>
      </main>
      <section id='blogs' className='mb-0 p-8 bg-slate-200 min-h-40 flex flex-col items-center'>
        <div>  
          <input type="text" placeholder="Search..." className="input bg-gray-200  input-bordered input-sm md:w-[15rem] max-w-xs" />
        </div>
        <div   className='m-8  flex gap-10 justify-center flex-wrap '>
           
           {
            blogs && blogs?.map((item, i)=>(
              <div className="xl:max-w-[20rem]  max-w-[18rem]  rounded overflow-hidden shadow-lg">
              <img  onClick={()=> BlogDescription(item?._id)} className="w-full cursor-pointer" src={item?.secure_url} alt="Mountain"/>
              <div className="px-6 py-4">
              <div className=" pt-2 pb-2 flex justify-between">
                <div>              
                </div>
                
              </div>
                <div className="font-bold text-xl mb-2">{item?.title}</div>
                <p className="text-gray-700 text-base">
                 {item?.description}
                </p>
              </div>
              
            </div>
          
          
          ))
        }
        {/* return <CourseCard key={element._id} data={element} /> */}
      
        </div>
      </section>
    </div>
  )
}

export default Home
