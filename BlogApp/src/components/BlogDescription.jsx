import React, { useEffect, useId, useMemo, useState } from 'react'
import "../App.css"
import { IoMdHeart } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import { RiDeleteBin3Fill } from "react-icons/ri";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaCommentDots } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import { FiHeart } from "react-icons/fi";
import Navbar from './Navbar'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CommentInBlog, blogFindByID, deleteBlogByID, likedBlog, updateBlog } from '../store/blogSlice';
import { FcLike } from "react-icons/fc";

function BlogDescription() {


  const id = useParams();
  const userId = useSelector((state) => state?.auth?.data?.user?.user_id || state?.auth?.data?.user_id);
  // const  = useSelector((state) => state?.auth?.data?.user?.user_id);
  const [like, setLike] = useState([]);
  const [likeFlag, setLikeFlag] = useState(false);
  const [blogLikedData, setBlogLikedData] = useState({
    blogId: id?.id,
    user_id: userId,
  });
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState({});
  const [blog, setBlog] = useState([])
  const [blogComments, setBlogComments] = useState([])

  const checkIfUserLiked = () => {
    for (const item of like) {
      if (item.user_id === userId) {
        setLikeFlag(true);
        return;
      }
    }
    setLikeFlag(false);
  };

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    })
  }



  const [commentData, setCommentData] = useState({
    user_id: userId,
    blogId: id?.id,
    comment_message: "",
  })

  function handleUserInput(e) {
    const { name, value } = e.target;
    setCommentData({
      ...commentData,
      [name]: value
    })
  }

  const comment = async () => {
    const res = await dispatch(CommentInBlog(commentData))
    // console.log(res)
    // console.log(res?.payload?.blog?.comment)
    setBlog(res?.payload?.blog?.comment)
    if (res?.payload?.success == true) {
      load()
      setCommentData({
        user_id: userId,
        blogId: id?.id,
        comment_message: "",
      })
    }
  }
  // console.log(blog)

  const liked = async () => {
    console.log(blogLikedData)
    const res = await dispatch(likedBlog(blogLikedData));
    setLikeFlag(true)
    // console.log(res);
  };

  const load = async () => {
    const res = await dispatch(blogFindByID(id?.id));
    setBlogData(res?.payload?.blog);
    setLike(res?.payload?.blog?.likes);
    setBlogComments(res?.payload?.blog?.comment)
  };


  // console.log(blogComments)
  const editBlog = async()=>{
 
     navigate(`/update-blog/${id?.id}`,{ data : blogData} )
  }
  const deleteBlog = async ()=>{
    const res = await dispatch(deleteBlogByID(id?.id))
    if(res?.payload?.success == true){
        navigate("/")
    }
  }

  useEffect(() => {
    load();
  }, []);

 
  useEffect(() => {
    checkIfUserLiked();
  }, [like, userId,  ]);

  return (
    <div className='bg-slate-200 min-h-screen flex justify-center pt-28 '>
      <Navbar />
      <div className='w-[70%] mt-20 '>
        
        {/* <div className='relative'>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box ">
            <h3 className="font-bold text-lg">comment</h3>
            {/* ///////////////////////// */}
            {/* <div className='w-[14rem] h-44  scroll-smooth'>

              {
                blogComments && blogComments?.map((comment, i) => (
                  <p>
                    {comment.comment_message}
                  
                    
                  </p>
                ))
              }
            </div>
            <div className="modal-action fixed bottom-0 left-0 ">

              <input type="text" className='input w-[100%]' name="comment_message" value={commentData.comment_message} onChange={handleUserInput} placeholder='message' />
              <button className="btn z-10" onClick={comment}>comment</button>
            </div>
          </div>
          
          <form method="dialog" className="modal-backdrop">
            <button><RxCrossCircled /></button>
          </form>
        </dialog> 
        </div> */}


<div className='relative p-2 '>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box pb-16  ">
              <h3 className="font-bold text-lg">comment</h3>
              <div className='w-[100%] h-44 bg-slate-100 p-2 overflow-y-auto'>
                {
                  blogComments && blogComments?.map((comment, i) => (
                    <p key={i}>
                      {
                        comment.length < 0 ? "Empty" : ""
                      }
                      {comment.comment_message}
                    </p>
                  ))
                }
              </div>
              <div className="modal-action w-[80%]  shadow-xl fixed bottom-0 left-12">
                <input type="text" className='input w-[100%]  shadow-2xl border-2 border-gray-300' name="comment_message" value={commentData.comment_message} onChange={handleUserInput} placeholder='message' />
                <button className="btn z-10 bg-green-400" onClick={comment}>comment</button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button><RxCrossCircled /></button>
            </form>
          </dialog>
        </div>
        {/* ????????????????????????????? */}
        <div className="card  lg:card-side bg-base-100 shadow-xl">
          <figure className='w-[50%]'><img src={blogData?.secure_url} alt="Album" /></figure>
          <div className="card-body">
            <h2 className="card-title">{blogData?.title}</h2>
            <p>{blogData?.description}</p>
            <div className="card-actions flex justify-between ">
              {/* <button className="btn btn-primary">Com</button> */}
              <div>
                <span className="inline-block colo rounded-full   font-semibold text-gray-700 text-xl" onClick={liked}>
                  {
                    likeFlag ? <FcLike /> :
                      <FiHeart />
                  }
                </span>
                <span className="inline-block colo rounded-full  ml-4 font-semibold text-gray-700 text-xl" onClick={() => document.getElementById('my_modal_2').showModal()}>
                  <FaCommentDots /></span>

              </div>
              <div>
                <span className="inline-block bg-gray-200 rounded-full   text-xl font-semibold text-gray-700 " onClick={editBlog}>
                  {
                    blogData?.user_id == userId ? 
                    <BiSolidEditAlt /> : ""
                  }
                  </span>
                <span className="inline-block bg-gray-200 rounded-full ml-4 py1 text-xl font-semibold text-gray-700 " onClick={deleteBlog}>
                  {
                    blogData?.user_id == userId ? 
                    <RiDeleteBin3Fill /> : ""
                  }
                  </span>
              </div>
            </div>
          </div>
        </div>

        <section>
          <div>
            {
              blog &&
              blog?.map((com, i) => {
                <p key={i}> com {com.comment_message}</p>
              })
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default BlogDescription
