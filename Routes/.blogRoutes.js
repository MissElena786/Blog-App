// import Express, { application }  from "express";
import express from 'express'
import cookieParser from 'cookie-parser';
import upload from '../middelware/multer.middelware.js';
import { BlogLikeOption, blogFindByID, comment, createBlog, deleteBlog, MyBlogs , fetchAllBlog, likedBlog, myLikedBlog, updateBlog } from '../Controllers/blog.controller.js';

const BlogRoutes = express.Router()
const app = express()
import cors from "cors"

app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors({
   origin : "*",
   credentials : true,

   // withCredentials : true,
   optionsSuccessStatus: 200

}))

BlogRoutes.post("/create", upload.single("file"), createBlog )
BlogRoutes.put("/update/:id", upload.single("file"), updateBlog )
// BlogRoutes.post("/register", upload.single("file"), addUser )
BlogRoutes.delete("/delete/:id", deleteBlog )
BlogRoutes.post("/like",BlogLikeOption )
BlogRoutes.post("/comment", comment )
BlogRoutes.post("/myLikedBlog", myLikedBlog )
BlogRoutes.get("/getBlog", fetchAllBlog)
BlogRoutes.post("/blogFind", blogFindByID)
BlogRoutes.post("/my-blogs", MyBlogs)
// BlogRoutes.get("/logout", logout )




export  default BlogRoutes
