import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myLikesBlog } from '../store/blogSlice'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Likes() {

   const userId = useSelector((state) => state?.auth?.data?.user?.user_id || state?.auth?.data?.user_id );
   const [myLikeBlog, setMyLikeBlog] = useState([])
   const dispatch =  useDispatch()
   const navigate = useNavigate()
   const load = async()=>{
      const res =  await dispatch(myLikesBlog(userId))
      setMyLikeBlog(res?.payload?.blogs)
   }

   const BlogDescription = (id)=>{
      navigate(`/blog-description/${id}`)
   }


   console.log(myLikeBlog)

   useEffect(()=>{
      load()

   },[])
   

  return (
    <div className='bg-gray-200 min-h-screen  p-20' >
      <Navbar/>

        <div>
         <h1 className='text-center mt-16 text-xl text-blue-800 font-bold   underline'> Liked Blogs</h1>
         <div>
         <div   className='m-8  flex gap-10 justify-center flex-wrap '>
           
           {
            myLikeBlog && myLikeBlog?.map((item, i)=>(
              <div className="xl:max-w-[20rem]  max-w-[18rem]  rounded overflow-hidden shadow-lg">
              <img 
              onClick={()=> BlogDescription(item?._id)}
               className="w-full cursor-pointer" src={item?.secure_url} alt="Mountain"/>
              <div className="px-6 py-4">
              <div className=" pt-2 pb-2 flex justify-between">
                <div>
                </div>
                
              </div>
                <div className="font-bold text-xl mb-2">{item.title}</div>
                <p className="text-gray-700 text-base">
                 {item.description}
                </p>
              </div>
              
            </div>
          
          
          ))
        }
      
        </div>
         </div>
        </div>
    </div>
  )
}

export default Likes
