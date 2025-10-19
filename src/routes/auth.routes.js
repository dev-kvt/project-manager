import {Router} from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { userRegisterValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
//all the imported statments lie in here 


const router = Router();

router.route("/register" ).post(userRegisterValidator() , validate , registerUser);



export default router ;




