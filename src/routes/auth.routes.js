import {Router} from "express";
import { login, registerUser } from "../controllers/auth.controller.js";
import { userloginValidator, userRegisterValidator } from "../validators/index.js";
import { validate } from "../middlewares/validator.middleware.js";
import { asyncHandler } from "../utils/async-handler.js";
import {validateverifyJwt} from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register" ).post(userRegisterValidator() , validate , registerUser);
router.route("/login" ).post(userloginValidator() ,validate,login);
router.route("/logout" ).post(verfifyJwt ,logoutUser);





export default router ;




