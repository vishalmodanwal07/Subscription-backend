import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/' , getUsers);  //users is a static parameter

userRouter.get('/:id' ,getUser);  //users/:id is a dyanamic parameter

userRouter.post ('/' , (req , res)=> res.send({title :" Create new user"}));

userRouter.put('/:id' , (req , res)=> res.send({title :" update user"}));

userRouter.delete('/:id' , (req , res)=> res.send({title :" delete user"}));

export default userRouter;