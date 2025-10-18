import {User} from '../models/user.model.js';
import nodemailer from 'nodemailer' ;  
import Mailgen from 'mailgen' ;
import {ApiResponse} from '../utils/api-response.js' ;
import {asyncHandler} from '../utils/async-handler.js' ;
import sendEmail, { emailVerificationMailgenContent }  from '../utils/mail.js';  

const registerUser =   asyncHandler( async ( req , res ) => {
    const {username , password , role , email } = req.body

    const exsitedUser = await User.findeOne({
        $or:[
            {username} ,
             {email},
        ]
    })
    if ( exsitedUser ) {
        throw new ApiError(409, "User with given username or email already exists" , []) ;

    }


    const user = User.create({
        username ,
        password ,
        isEmailVerified :false,
        email 
    }) ;

const { unHashedToken , HashedToken , TokenExpiry} =  user.generateTemporaryToken();
  user.generateTemporaryToken();
  user.emailverificationtoken = hashedToken ;
  user.emailverificationtokenexpiry = tokenExpiry ;

  await user.save({validateBeforeSave : false});
    //send verification email

 await sendEmail({
    email: user?.email,
    subject: "Please verify your email address",
    mailgenContent: emailVerificationMailgenContent(user.username , 
        `${req.protocol}://${req.get("host")}/api/v1/users/verify-email?token=${unHashedToken}`
    )
 });
 const createdUser = await user.findById(user._id).select(
    "-password -refreshToken -emailverificationtoken -emailverificationtokenexpiry"
 )
 if(!createdUser){
    throw new ApiError(500 , "User not created successfully" , []) ;
 }
 return 
 res
 .status(201)
 .json(new ApiResponse(
    true ,
    "User registered successfully . Please check your email to verify your account " ,
    createdUser
 )


)});

export { registerUser};

const generateAccessAndRefreshToken = async (userId) => {
    try{
       const user =  await User.findById(userId) ;
      const accessToken =  user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken 
        await user.save({validateBeforeSave : false}) ;
        return { accessToken , refreshToken } ;
    }



    catch (error) {
        throw new ApiError(404 , "User not found " , []) ;
    }
}
