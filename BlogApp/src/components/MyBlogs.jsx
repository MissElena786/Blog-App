import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MyBlogsfetches } from '../store/blogSlice';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function MyBlogs() {
   const user_id = useSelector((state) => state?.auth?.data?.user?.user_id || state?.auth?.data?.user_id);
   console.log(user_id)
   const navigate = useNavigate()

 const dispatch = useDispatch()
   const [blogs, setBlog] = useState([])


   const BlogDescription = (id)=>{
      navigate(`/blog-description/${id}`)
   }
   const load = async()=>{
      const res = await dispatch(MyBlogsfetches(user_id))
      console.log(res)
      setBlog(res?.payload?.blogs)
    }
   useEffect(()=>{
     load()  
   },[dispatch])

  return (
    <div className='min-h-screen '>
      <Navbar/>
         <section id='blogs' className='mb-0 pt-32 bg-slate-200 min-h-40 flex flex-col items-center'>
        <div>  
          <input type="text" placeholder="Search..." className="input bg-gray-200  input-bordered input-sm md:w-[15rem] max-w-xs" />
        </div>
        <div   className='m-8  flex gap-10 justify-center flex-wrap '>
           
           {
            blogs && blogs?.map((item, i)=>(
              <div className="xl:max-w-[20rem]  max-w-[18rem]  rounded overflow-hidden shadow-lg">
              <img onClick={()=> BlogDescription(item?._id)} className="w-full cursor-pointer" src={item?.secure_url} alt="Mountain"/>
              <div className="px-6 py-4">
              <div className=" pt-2 pb-2 flex justify-between">
                <div>              
                </div>
                
              </div>
                <div className="font-bold text-xl mb-2">{item?.title}</div>
                <p className="text-gray-700 text-base">
                 {item.description}
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

export default MyBlogs
