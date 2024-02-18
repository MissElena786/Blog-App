import User from "../model/user.model.js"
import fs from "fs"
import AppError from "../utils/error.util.js";
import bcrypt from "bcrypt"


const cookieOptions = {
  maxAge: 1 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true
}

const addUser = async (req, res, next) => {
  const { name, user_id, email, password, role } = req.body;

  if (!name || !user_id || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  try {
    let avatarDataUrl = null;

    if (req.file) {
      try {
        // Read the avatar file as binary data
        console.log(req.file.path);
        // const avatarBuffer = await fs.readFile(req.file.path);
        const avatarBuffer = fs.readFileSync(req.file.path);

        avatarDataUrl = `data:image/png;base64,${avatarBuffer.toString("base64")}`;

        // Delete the temporary file after reading
        // await fs.unlink(req.file.path);
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          success: false,
          message: `File not uploaded error: ${e.message}`,
        });
      }
    }

    const user = await User.create({
      name,
      email,
      user_id,
      avatar: avatarDataUrl,
      password,
      role,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not created",
      });
    }

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    console.log("..", error?.errors)
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res, next) =>{
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        return next (new AppError('All fields are required', 402));
    }

    const user = await User.findOne({
        email
    }).select('+password');

    if (!user) {
        // return next(new AppError('does not have account with this email', 500));
        return  res.status(400).json({
          success: false,
          message: `does not have an account with this email`,
         
      });
   
    }
 

    const passwordMatch = await bcrypt.compare(password, user.password);

   if (!passwordMatch){
        // return next(new AppError('Email or password does not match', 500));
        return  res.status(400).json({
          success: false,
          message: `email or password does not match`,
         
      });
   }
    

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message: 'User loggedin successfully',
        user,
        token
    });
} catch(e) {
  console.log(e)
    return next(new AppError(e.message, 500));
}
}

const logout = (req, res) => {
  res.cookie('token', null, {
      secure: true,
      maxAge: 0,
      httpOnly: true
  });

  res.status(200).json({
      success: true,
      message: 'User logged out successfully'
  })
};
 const getAllUser = async (req, res)=>{
  try {
    const users = await User.find({})
    if (!users) {
      return res.status(400).json({
        success: false,
        message: "Users not found",
      });
    }
    
  } catch (error) {
    console.log(error)
      return res.status(400).json({
        success: false,
        message: error?.message,
      });
    
  }

}

const getProfile = async (req, res, next) => {
  try {
      const { id} = req.body
      // const userId = req.;
      
     if (!id){
      return next(new AppError('id is required', 400));
 }
      const user = await User.findById(id);
      console.log(user)

      res.status(200).json({
          success: true,
          message: 'User details',
          user
      });
  } catch(e) {
      return next(new AppError('Failed to fetch profile details', 500));
  }
};



const changePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if(!oldPassword || !newPassword) {
      return next(
          new AppError('All fields are mandatory', 400)
      )
  }

  const user = await User.findById(id).select('+password');

  if(!user) {
      return next(
          new AppError('User does not exist', 400)
      )
  }

  const isPasswordValid = await user.comparePassword(oldPassword);

  if(!isPasswordValid) {
      return next(
          new AppError('Invalid old password', 400)
      )
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
      success: true,
      message: 'Password changed successfully!'
  });
}


export{
   addUser,
   login,
   logout,
   getAllUser,
   getProfile,
   changePassword

}