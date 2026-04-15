import express from 'express';
import { createUser, loginUser ,getUser , googleLogin , resetPassword, sendOTP ,saveContact , registerUser} from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post("/",createUser)
userRouter.get("/",getUser)
userRouter.post("/login",loginUser)
userRouter.post("/google-login", googleLogin)
userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password",resetPassword)
userRouter.post("/contact", saveContact);
userRouter.post("/register", registerUser);


export default userRouter;
