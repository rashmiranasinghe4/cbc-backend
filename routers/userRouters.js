import express from 'express';
import { createUser, loginUser ,getUser , googleLogin , resetPassword, sendOTP ,saveContact , registerUser, getAllUsers, updateUserStatus } from '../controllers/userController.js';

 


const userRouter = express.Router();
userRouter.post("/",createUser)
userRouter.get("/",getUser)

userRouter.post("/login",loginUser)
userRouter.post("/google-login", googleLogin)

userRouter.post("/send-otp", sendOTP)
userRouter.post("/reset-password",resetPassword)

userRouter.post("/contact", saveContact);

userRouter.post("/register", registerUser);


userRouter.get("/all", getAllUsers);

userRouter.put("/update/:id", updateUserStatus);


export default userRouter;
