import {User} from '../models/user.model.js';
import sendEmail, { emailVerificationMailgenContent }  from '../utils/mail.js';  
import {ApiResponse} from '../utils/api-response.js' ;
import {asyncHandler} from '../utils/async-handler.js' ;
import { ApiError } from '../utils/api-error.js';

const registerUser = asyncHandler(async (req, res) => {
    // normalize input
    const username = (req.body.username || "").trim().toLowerCase();
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password;

    // quick existing check (case-insensitive because we normalized)
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
   console.log("Existing user:", existedUser);

    if (existedUser) {
        throw new ApiError(409, "User with given username or email already exists", []);
    }

    try {
        const user = await User.create({
            username,
            password,
            isEmailVerified: false,
            email
        });

        const { unHashedToken, HashedToken, TokenExpiry } = user.generateTemporaryToken();

        user.emailverificationtoken = HashedToken;
        user.emailverificationtokenexpiry = TokenExpiry;

        await user.save({ validateBeforeSave: false });

        await sendEmail({
            email: user.email,
            subject: "Please verify your email address",
            mailgenContent: emailVerificationMailgenContent(
                user.username,
                `${req.protocol}://${req.get("host")}/api/v1/users/verify-email?token=${unHashedToken}`
            )
        });

        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken -emailverificationtoken -emailverificationtokenexpiry"
        );

        return res.status(201).json(new ApiResponse(true, "User registered successfully. Please check your email to verify your account", createdUser));
    } catch (err) {
        // handle duplicate key (race) from MongoDB
        if (err.code === 11000) {
            throw new ApiError(409, "User with given username or email already exists", []);
        }
        throw err;
    }
});

export { registerUser };

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
