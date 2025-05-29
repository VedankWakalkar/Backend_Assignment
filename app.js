import express from "express";
import { PORT } from "./config/env.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

import connectToDatabase from "./database/mongoose.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";
import planRouter from "./routes/plan.route.js";

const app= express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(cors())

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/',planRouter);

app.listen(PORT,async()=>{
    console.log(`Server Started on http://localhost:${PORT}`)
    await connectToDatabase();
})

export default app;