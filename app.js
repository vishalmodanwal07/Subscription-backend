import express from "express";
import { PORT } from "./config/env.js";

const app = express();
app.get('/' , (req , res)=>{
    res.send("welcome");
});

app.listen(PORT , ()=>{
    console.log(`subscription tracking API running on  http://localhost:${PORT}`);
})

export default app; 