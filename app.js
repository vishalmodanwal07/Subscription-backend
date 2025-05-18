import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import ConnectDB from "./database/mongodb.js";
import errMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json()); //handle json data
app.use(express.urlencoded({extended : 'false'})); // process form data sent via form in a simple format
app.use(cookieParser()); //read cookies from incoming request so app can store user data

app.use('/api/v1/auth' , authRouter);  //middleware
app.use('api/v1/users' , userRouter);
app.use('/api/v1/subscriptions' , subscriptionRouter);

app.use(errMiddleware);

app.get('/' , (req , res)=>{
    res.send("welcome");
});

app.listen(PORT , async ()=>{
    console.log(`subscription tracking API running on  http://localhost:${PORT}`);
    await ConnectDB(); //db connection
})

export default app; 