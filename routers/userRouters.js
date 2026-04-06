import express from 'express';
import { createUser, loginUser ,getUser , googleLogin } from '../controllers/userController.js';

const userRouter = express.Router();
userRouter.post("/",createUser)
userRouter.get("/",getUser)
userRouter.post("/login",loginUser)
userRouter.post("/google-login", googleLogin)

export default userRouter;
