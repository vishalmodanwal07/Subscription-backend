import { Router } from "express";

const userRouter = Router();

userRouter.get('/' , (req , res)=> res.send({title :" GET all users"}));  //users is a static parameter

userRouter.get('/:id' , (req , res)=> res.send({title :" GET user by id"}));  //users/:id is a dyanamic parameter

userRouter.post ('/' , (req , res)=> res.send({title :" Create new user"}));

userRouter.put('/:id' , (req , res)=> res.send({title :" update user"}));

userRouter.delete('/:id' , (req , res)=> res.send({title :" delete user"}));

export default userRouter;