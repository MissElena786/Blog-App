import mongoose, {Schema, model} from "mongoose"

const blogSchema = new Schema({
   
   title : {
      type : String,
      required : [true,'title is required'],
      trim : true
      
   },
   description : {
      type : String,
      required : [true,'description is required'],
      trim : true
   }, 
   user_id :{
      type : String,
      required : [true,'userId required is required'],
      trim : true
   },

   secure_url :{
      type:  String,
      required : [true, "url is required"]
   },

// likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user_id' }],
likes: [
   {
      user_id: {
        type: String, // or whatever type your user_id is
        required: true,
      }
    }
 ],

   comment :[
      {
         user_id: {
           type: String, // or whatever type your user_id is
           required: true,
         },
        comment_message : {
            type : String,
            required: true,

         }
       }
    ],


},{
   
   timestamps: true
}
)


const Blog = model('blog', blogSchema);

export default Blog;
