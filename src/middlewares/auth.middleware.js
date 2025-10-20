import {User} from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler';  
import {ApiError} from '../utils/api-error.js';
import jwt from 'jsonwebtoken';

export const VerifJwt = asyncHandler ( async( req , res , next) => {
   const token =  req.cookie?.accessToken|| req.header(Authorization)?.replace("Bearere" , "")  });
  const user = await User.findById(decoded?._id).select("-password -refreshToken -emailverificationtoken -emailverificationtokenexpiry");
    if(!token){
        throw new ApiError(401 , "Unauthorized access" , []);
    }
    try{
        const decoded = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded?._id).select("-password -refreshToken -emailverificationtoken -emailverificationtokenexpiry");
        if(!user){  
            throw new ApiError(401 , "Unauthorized access token" , []);
        }
        req.user = user ;
        next();
    } catch(error){
        throw new ApiError(401 , "Unauthorized access" , []);
    }
