import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../helpers/baseUrl";


const initialState = {
    blogs : []
}


export const createBlog = createAsyncThunk("/blog/create", async (data) => {
   try {
       const res =  toast.promise(
              axios.post(baseUrl + "/create", data),  
        {
           loading: "Wait! creating your blog",
           success: (data) => {
               console.log("data",data)
               return data?.data?.message;
           },
           error: (error)=>{
            console.log(error)
            return error?.response?.data?.message || "faled to create blog"
           }
       });
      //  return res?.data
      return (await res).data;
   } catch(error) {
       toast.error(error?.response?.data?.message);
   }
})



export const updateBlog = createAsyncThunk("/blog/update", async ( {id, data}) => {
    try {
        const res =  toast.promise(
               axios.put(baseUrl + `/update/${id}`, data),  
         {
            loading: "Wait.. for updating the blog ",
            success: (data) => {
                console.log("data",data)
                return data?.data?.message;
            },
            error: (error)=>{
             console.log(error)
             return error?.response?.data?.message || "faled to update the blog"
             //    toast.error(error?.response?.data?.message);
            }
        });
       //  return res?.data
       return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
 })


 
export const deleteBlogByID = createAsyncThunk("/blog/delete", async ( id) => {
    try {
        const res =  toast.promise(
               axios.delete(baseUrl + `/delete/${id}`),  
         {
            loading: "Wait.. for deleting the blog ",
            success: (data) => {
                console.log("data",data)
                return data?.data?.message;
            },
            error: (error)=>{
             console.log(error)
             return error?.response?.data?.message || "faled to delete the blog"
             //    toast.error(error?.response?.data?.message);
            }
        });
       //  return res?.data
       return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
 })


export const fetchAllBlog = createAsyncThunk("/all/blogs", async () => {
   try {
       const res =  axios.get(baseUrl + "/getBlog");
       toast.promise(res, {
           loading: "Wait! fetching all blogs.",
           success: (data) => {
               return data?.data?.message;
           },
           error: "Failed to fetch blog"
       });
       return (await res).data;
   } catch(error) {
       toast.error(error?.response?.data?.message);
   }
})


export const likedBlog = createAsyncThunk("/blogs/like", async (data) => {
    try {
        const res =  axios.post(baseUrl + "/like" , data);
        toast.promise(res, {
            loading: "Wait! for  like blogs.",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to like blog"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
 })

 export const CommentInBlog = createAsyncThunk("/blogs/comment", async (data) => {
    try {
        const res =  axios.post(baseUrl + "/comment" , data);
        toast.promise(res, {
            loading: "Wait! for comment...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to write comment"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
 })



 export const myLikesBlog  = createAsyncThunk("/blogs/like", async (userId) => {
    try {
        const res =  axios.post(baseUrl + "/myLikedBlog" , {userId});
        toast.promise(res, {
            loading: "Wait! for your like blogs.",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to fetch your like blogs"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
 })
 


export const blogFindByID = createAsyncThunk("/blogById", async (id) => {
    try {
        const res =  axios.post(baseUrl + `/blogFind`, {id});
        toast.promise(res, {
            loading: "Wait! blog find.",
            success: (data) => {
                return data?.data?.message;
            },
            error: "failed to load blog"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
 })

 export const MyBlogsfetches = createAsyncThunk("/myBlog", async (user_id) => {
    try {
        const res =  axios.post(baseUrl + `/my-blogs`, {user_id});
        toast.promise(res, {
            loading: "Wait! your blog find.",
            success: (data) => {
                return data?.data?.message;
            },
            error: "failed to load blog"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
 })


const blogSlice = createSlice({
   name : "blog",
   initialState,
   reducers : {},
   extraReducers : (builder) =>{
     builder
     .addCase(createBlog.fulfilled, (state , action)=>{
        //    console.log("action", action?.payload) 
     })
     .addCase(fetchAllBlog.fulfilled, (state,action)=>{
         console.log("payload", action.payload.blogs)
         state.blogs = action?.payload?.blogs
     })

   }
})



export default blogSlice.reducer