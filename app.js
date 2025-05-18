import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import ConnectDB from "./database/mongodb.js";

const app = express();

app.use('/api/v1/auth' , authRouter);  //middleware
app.use('api/v1/users' , userRouter);
app.use('/api/v1/subscriptions' , subscriptionRouter);

app.get('/' , (req , res)=>{
    res.send("welcome");
});

app.listen(PORT , async ()=>{
    console.log(`subscription tracking API running on  http://localhost:${PORT}`);
    await ConnectDB(); //db connection
})

export default app; 