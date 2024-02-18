import Blog from "../model/blog.model.js";

import AppError from "../utils/error.util.js";
import fs from "fs"

const createBlog = async (req, res, next)=>{
    const {title, description , user_id} = req.body;
    if (!title || !user_id || !description ) {
      return next(new AppError('All fields are mendatory', 400));
    }

    
   let blogUrl = null;
   try {
    if(!req.file){
      return next(new AppError('blog File is required', 400));
    }
   if (req.file) {
     try {
       console.log(req.file.path);
       const avatarBuffer = fs.readFileSync(req.file.path);

       blogUrl = `data:image/png;base64,${avatarBuffer.toString("base64")}`;

      //  await fs.unlink(req.file.path);
     } catch (e) {
       console.log(e);
       return res.status(400).json({
         success: false,
         message: `File not uploaded error: ${e.message}`,
       });
     }
   }

    const blog = await Blog.create({
         title,
         description,
         user_id,
         secure_url  : blogUrl,
    } )
    if (!blog) {
      return next(new AppError('blog not created', 400));
    }

     res.status(200).json({
      success: true,
      message: `blog created successfully`,
      blog
    });

   } catch (e) {
        console.log(e);
       return res.status(400).json({
         success: false,
         message: ` error: ${e.message}`,
       });
   }
  
}

 const updateBlog = async(req, res, next)=>{
   const {title, description} = req.body
   const {id} = req.params
   try {

 if (!id ) {
      return next(new AppError('id is required', 400));
    }

    if (!title || !description) {
      return next(new AppError('id is required', 400));
    }
   const blog = await Blog.findById(id)

   if (!blog ) {
    return next(new AppError('blog not found', 400));
  }
 
   let blogUrl
   if(req.file){
    try {
      console.log(req.file.path);
      const avatarBuffer = fs.readFileSync(req.file.path);

       blogUrl = `data:image/png;base64,${avatarBuffer.toString("base64")}`;
       blog.secure_url = blogUrl
        blog.title = title
        blog.description = description
      
         await blog.save()
         res.status(200).json({
          success: true,
          message: `blog updated successfully`,
          blog
        });
        

     //  await fs.unlink(req.file.path);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        message: `File not updated error: ${e.message}`,
      });
    }
   }
 

    
  } catch (error) {
    console.log(error) 
    return res.status(500).json({
      success: false,
      message: `error :${error.message}`,
    });
  }
 }

 
 const deleteBlog = async(req, res, next)=>{
  const {id} = req.params
  try {
    
  if (!id ) {
    return next(new AppError('id is required', 400));
  }
  const blog  = await Blog.findById(id)
  if (!blog ) {
    return next(new AppError('blog no found', 400));
  }
    const deleted =  await Blog.findByIdAndDelete(id)

    if (!deleted ) {
      return next(new AppError('blog not deleted', 400));
    }
  res.status(200).json({
    success: true,
    message: `blog deleted successfully`,

  });
} catch (error) {
  console.log(error)
  return res.status(500).json({
    success: false,
    message: `error${error.message}`,

  }); 
}
 }

const blogFindByID = async (req, res, next)=>{
  const { id }= req.body
        if(!id){
          return next(new AppError('id is required', 400));
        }
        const blog = await Blog.findById(id)
        if(!blog){
          return next(new AppError('blog  not found', 400));
        }
 
        res.status(200).json({
          status : true,
          message : "blog found successfully ",
          blog
        })
}


const likedBlog = async (req, res, next)=>{
  // const { blogId } = req.query;

  try {

    const {data} = req.body;
    console.log("body",req.body)
    
    if(!data?.blogId  || !data?.user_id){
                return next(new AppError('id is required', 400));
              }

    const blog = await Blog.findById(data.blogId);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if the user has already liked the blog
    // if (blog.likes.includes(data?.user_id)) {
    //   return res.status(400).json({ message: 'User already liked this blog' });
    // }

    blog.likes.push(data?.user_id);
    await blog.save();

    res.status(200).json({
      success: true,
      message: `blog liked successfully`,
      blog
  
    });
    } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success : false,
      message: error.message });
  }
}




const BlogLikeOption = async (req, res, next) => {
  const { blogId, user_id} = req.body;
  console.log(req.body)

  if (!blogId ) {
    return next(new AppError('id is required', 400));
  }

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return next(new AppError('blog not found', 400));
    }

    if (!user_id ) {
      return next(new AppError('user id is required', 400));
    }
    // Check if the user has already liked the blog
    if (blog.likes.some(like => like.user_id === user_id)) {
      return res.status(400).json({ message: 'User already liked this blog' });
    }

    // Update the blog with the new like
    blog.likes.push({user_id : user_id});
    const updatedBlog = await blog.save();

    res.status(200).json({
      success: true,
      message: 'Blog liked successfully',
      blog: updatedBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const myLikedBlog = async (req, res, next) => {
  const { userId } = req.body;

  try {
    const blogs = await Blog.find({ 'likes.user_id': userId })

    if (!blogs ) {
      return next(new AppError('Blogs not found for the given user_id', 404));
    }
    // console.log(lenght)

    res.status(200).json({
      success: true,
      message: 'Blogs fetched successfully',
      blogs
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const comment = async (req, res, next)=>{
  const {user_id, blogId,comment_message} = req.body

  try {
    
    if (!user_id || !blogId || !comment_message) {
      return next(new AppError('all fields are mendatory', 400));
    }



    // const blog = await Blog
    const blog = await Blog.findById(blogId)
    
    if (!blog) {
      return next(new AppError('Blogs not found for the given blog Id', 404));
    }

     blog.comment.push({user_id, comment_message});
     await blog.save();
    
    res.status(200).json({
      success: true,
      message: "comment done successfully",
      blog
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  
  }
}



const fetchAllBlog = async (req, res, next)=>{
    try {

      const blogs = await Blog.find({})

      if(!blogs){
        return res.status(400).json({ message: 'blog not found' }); 
      }
     
      res.status(200).json({
        success: true,
        message: `blog fetches  successfully`,
        blogs
    
      });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
}


const MyBlogs = async (req, res, next)=>{
  try {
    const {user_id} = req.body 
    console.log(user_id)
    if(!user_id){
      return res.status(400).json({
        success : false,
         message: 'user Id is required' 
        }); 
    }

    const blogs = await Blog.find({user_id})

    if(!blogs){
      return res.status(400).json({
        success : false,
         message: 'blog not found' }); 
    }
   
    res.status(200).json({
      success: true,
      message: ` My blog fetches  successfully`,
      blogs
  
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export {

   createBlog,
   updateBlog,
   MyBlogs,
   deleteBlog,
   fetchAllBlog,
 likedBlog,
 myLikedBlog,
 BlogLikeOption,
 blogFindByID,
 comment,
}
    


