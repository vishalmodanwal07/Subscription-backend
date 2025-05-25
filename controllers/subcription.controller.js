import Subscription from "../models/subscription.model.js"

export const createSubscription = async(req , res , next) =>{
    try {
        const subscription = await Subscription.create({
         ...req.body,
         user : req.user._id,
      });
      res.status(201).json({success : true , data : subscription })
    } catch (error) {
        next(error);
    }
}


export const getUserSubscriptions = async (req, res , next) =>{
try {

    const {user} = req.params.id;
    //check if the user is the same as the one in the token
      if(req.user.id === user){
        const error = new Error('you are not the owner of this account ');
        error.status = 401;
        throw error;
      }
      const subscription = await Subscription.find(user);
      res.status(200).json({
        success : true , data: subscription
      });
} catch (error) {
    next(error);
}

}
