import mongoose from "mongoose"
import User from "../model/user.model.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp=async(req,res,next)=>{
    const session= await mongoose.startSession();
    try{
        session.startTransaction()
        const {username, email, password}=req.body;

        const existingUser=await User.findOne({
            email
        }).session(session);
        if(existingUser){
            const error= new Error("User Already Exist!")
            error.statusCode=404;
            throw error
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=await User.create([{
            ...req.body,
            password:hashedPassword
        }],{session})

        const token=jwt.sign({
            userId:newUser[0]._id
        }, JWT_SECRET,{
            expiresIn:JWT_EXPIRES_IN
        })

        await session.commitTransaction();
        await session.endSession();

        res
        .status(200).
        json({
            success:true,
            message:"User Created Successfully",
            data:{
                token:token,
                user:newUser[0]
            }
        })

    }catch(error){
        console.log("Some Error Occured ", error);
        await session.abortTransaction()
        await session.endSession()
        next(error)
    }
}

export const signIn=async(req,res,next)=>{
    try {
        const {username, email,password}=req.body;
    const user=await User.findOne({
        email
    });
    if(!user){
        const error=new Error("User not Found")
        error.statusCode=404;
        throw error;
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        const error= new Error("The Password is not valid")
        error.statusCode=403;
        throw error;
    }
    const token= jwt.sign({
        userId:user._id
    },JWT_SECRET,{
        expiresIn:JWT_EXPIRES_IN
    });
    res
    status(200)
    .json({
        success:true,
        message:'User Signed in successfully',
        data:{
            token:token,
            user:user
        }
    })  
    } catch (error) {
      console.log("Some Error Occured: ",error);
      next(error)  
    }
}

export const signOut=async(req,res,next)=>{
    try {
        const token=req.cookies.authToken || req.headers.authorization?.split(' ')[1];
        if(!token){
            const error = new Error ("Cookies is not available !")
            error.statusCode=403
            throw error;
        }
        res.clearCookie("authToken",{
            httpOnly:true, secure:true,sameSite:"strict"
        }).json({
            success:true,
            message:"User Signed out Successfully"
        })
    } catch (error) {
        console.log(
            "Some Error Occured: ",error
        )
        next(error)
    }
}