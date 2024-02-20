import {Schema, model} from "mongoose"
import bcrypt from "bcryptjs"
import jwt  from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

const userSchema = new Schema({
   
   name : {
      type : String,
      required : [true,'name is required'],
      trim : true
      
   },
   email : {
      type : String,
      required : [true,' Email is required'],
      unique : true,
      trim : true
   }, 
   user_id :{
      type : String,
      required : [true,'userId required is required'],
      unique : [true,"user id not available"],
       minLength: [5, 'Name must be at least 5 charchter'],
      //  maxLength: [50, 'Name should be less than 50 characters'],
      match: [
         // /^(?=.*[a-z])[a-z0-9]{5,20}$/i,
         // /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+{};:'",.<>?/\\[\]_`|~]{5,}$/,
         /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+{};:'",.<>?/\\[\]_`|~]{5,}$/,

         'Please fill in a valid user ID address',
      ],
      trim : true
   },
   password :{
      type:  String,
      required:[true , "password is required"],
      trim :true,
   },
   avatar :{
      type:  String,
      // default :  'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg'
   },
   role: {
      type: 'String',
      enum: ['USER', 'ADMIN'],
      default: 'USER'
  },
},{
   
   timestamps: true
}
)


userSchema.pre('save', async function(next) {
   if (!this.isModified('password')) {
       return next();
   }
   this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
   generateJWTToken: async function() {
       return await jwt.sign(
           { id: this._id, email: this.email, role: this.role },
           process.env.JWT_SECRET,
           {
               expiresIn: process.env.JWT_EXPIRY,
           }
       )
   },
   comparePassword: async function(plainTextPassword) {
       return await bcrypt.compare(plainTextPassword, this.password);
   },
 
   
}

const User = model('User', userSchema);

export default User;
