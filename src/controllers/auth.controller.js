import { User } from '../models/user.model.js';
import sendEmail, { emailVerificationMailgenContent } from '../utils/mail.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ApiError } from '../utils/api-error.js';
import cookieParser from 'cookie-parser';
const registerUser = asyncHandler(async (req, res) => {
    // normalize input
    const username = (req.body.username || "").trim().toLowerCase();
    const email = (req.body.email || "").trim().toLowerCase();
    const password = req.body.password;

    if (!password) {
        throw new ApiError(400, "Password is required", []);
    }

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
        if(!createdUser){
            throw new ApiError(500, "User creation failed", []);
        }

        return res.status(201).json(new ApiResponse(true, "User registered successfully. Please check your email to verify your account", createdUser));
    } catch (err) {
        // handle duplicate key (race) from MongoDB
        if (err && err.code === 11000) {
            throw new ApiError(409, "User with given username or email already exists", []);
        }
        throw err;
    }
});

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found", []);
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        // If it's already an ApiError, rethrow, else wrap
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, "Failed to generate tokens", []);
    }
};

const login = asyncHandler(async (req, res) => {
    let { email, password, username } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "Please provide username or email, they are required", []);
    }

    // normalize
    if (username) username = username.trim().toLowerCase();
    if (email) email = email.trim().toLowerCase();

    const user = await User.findOne({
        $or: [
            ...(email ? [{ email }] : []),
            ...(username ? [{ username }] : [])
        ]
    });

    if (!user) {
        throw new ApiError(404, "User not found", []);
    }

    const isPasswordValid = await user.isPasswordMatched(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials", []);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
     const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken -emailverificationtoken -emailverificationtokenexpiry"
        );
        if(!loggedInUser){
            throw new ApiError(500, "User creation failed", []);
        }

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new 
            ApiResponse(
                200, 
                {user: loggedInUser,
                accessToken,
                refreshToken

                },
                "user logged in successfully "
            )
        )
    

    res.status(200).json(new ApiResponse(true, "User logged in successfully", { accessToken, refreshToken }));
});


const logoutUser = asyncHandler( async(req, res ) => { 
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:
            {
                refreshToken:""

            }
        },
        {
                new :true ,
        },

      
        

    );

    const options = {
        httpOnly :true ,
        secure :true 
    }
return res 
.status(200)
.clearCookie("accessToken" , options)
.clearCookie("refreshToken" , options)
.json(
    new ApiResponse(200 , {} , "User Logged out")
)


export{ registerUser, generateAccessAndRefreshToken, login , logoutUser};
