import mongoose from "mongoose";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async (req , res ,next) =>{
   //mongoose transaction session
     const session = await mongoose.startSession();
     session.startTransaction(); //for safe register the user on 
     // database (edge case when server goes down operation cancelled data is not save in db)
     try { //implment signup logic here (Create a user post req.)
        console.log(req.body)
        const {name , password , email} = req.body;

         //check if user already exists
         const existingUser = await User.findOne({email});
         if(existingUser){
            const error = new Error('user already exist');
            error.statusCode =409;
            throw error;
         } 

         //hash password
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password , salt);

         //create user in db
         const newUsers = await User.create([{name , email , password : hashedPassword}] , {session}); // []array of users
         
         const token = jwt.sign({userId : newUsers[0]._id} , JWT_SECRET , {expiresIn : JWT_EXPIRES_IN});

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success : true,
            message : "User created successfully",
            data : {
                token,
                user : newUsers[0]
            }})
     } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
     }
}

export const signIn = async (req , res ,next) =>{
    //implment signIn logic here-->
    
}

export const signOut = async (req , res ,next) =>{
    //implment signOut logic here-->
    
}