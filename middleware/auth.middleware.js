import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";


const authories = async(req , res , next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token) return res.status(401).json({ message : 'unauthorized' });
        
        const decoded = jwt.verify(token , JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user) return res.status(401).json({message : 'unauthorised user'});
        req.user = user;

        next();
        
    } catch (error) {
        res.status(401).json({
          message :  'unauthorized user',
          error : error.message
        })
    }
}

export default authories;