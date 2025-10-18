import {ApiResponse} from "../utils/api-response.js";
import {ApiError} from "../utils/api-error.js";
import {asyncHandler} from "../utils/async-handler.js";
/*
const healthcheck = (req, res)=>{
    try{
        res
        .status(200)
        .jsons(new ApiResponse(200 , {message:"Server is healthy"}) );
    }
    catch(error){}
}
*/
const healthcheck = asyncHandler(
    async( req , res ) => {
        res
        .status(200)
        .json(new ApiResponse(200 , {message:"Server is very healthy"}) );
    }       
);



 export {healthcheck};
