import User from "../models/user.model.js";


export const  getUsers = async(req , res , next) => {
    try {
         const users = await User.find();
         res.status(200).json({
            success : true,
            message : 'all users fetched',
            data :   users
         })
    } catch (error) {
        next(error);
    }
}

export const  getUser = async(req , res , next) => {
    try {
         const id = req.params.id ;
         const user = await User.findById(id).select('-password');
         if(!user){
            const error = 'user not found';
            error.statusCode = 404;
            throw error;
         }
         res.status(200).json({
            success : true,
            message : ' user fetched',
            data :   user
         })
    } catch (error) {
        next(error);
    }
}