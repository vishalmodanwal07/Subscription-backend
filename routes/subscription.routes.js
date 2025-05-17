import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/' , (req , res)=> res.send({title : "GET alll subscription "}));

subscriptionRouter.get('/:id' , (req , res)=> res.send({title : " GET subscription details"}));

subscriptionRouter.post('/' , (req , res)=> res.send({title : "create subscription "}));

subscriptionRouter.put('/:id' , (req , res)=> res.send({title : " update subscription"}));

subscriptionRouter.delete('/' , (req , res)=> res.send({title : " delete subscription"}));

subscriptionRouter.get('/user/:id' , (req , res)=> res.send({title : "GET all the subscription of specufic user"}));

subscriptionRouter.put('/:id/cancel' , (req , res)=> res.send({title : " CANCELsubscription "}));

subscriptionRouter.get('/upcoming-renewals' , (req , res)=> res.send({title : "GET upcoming renewal "}));


export default subscriptionRouter;