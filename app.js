import express from "express";
import { PORT } from "./config/env.js";

const app= express();

app.get('/',(req,res)=>{
    res.json({
        message:"HElLO WORLD"
    })
})

app.listen(PORT,()=>{
    console.log(`Server Started on http://localhost:${PORT}`)
})

export default app;