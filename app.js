import express from "express";

const app = express();
app.get('/' , (req , res)=>{
    res.send("welcome");
});

app.listen(3000 , ()=>{
    console.log("subscription tracking API running on http://localhost:3000");
})

export default app; 