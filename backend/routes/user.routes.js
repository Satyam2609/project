import { Router } from "express";
import registerUser from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import loginUser from "../controller/login.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { userorder } from "../controller/order.controller.js";

const router = Router()

router.route("/register").post(upload.single("avatar"), registerUser);
router.route("/login").post(loginUser)
router.route("/order").post(isAuthenticated , userorder)

export {router}