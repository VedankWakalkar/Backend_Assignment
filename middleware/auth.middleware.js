import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env.js'
import User from '../model/user.model.js';

export const auhtorize=async(req,res,next)=>{
    try{
        let token;
        
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
            token= req.headers.authorization.split(' ')[1];
        }

        if(!token){
            console.log("Token is not available");
            console.log('is Token received, ',token);
            const error = new Error("Unauthorized")
            error.statusCode=403;
            throw error;
        }

        const decoded= jwt.verify(token, JWT_SECRET);
        const user= await User.findById(decoded.userId)

        if(!user){
            const error= new Error("User not found!");
            error.statusCode=404
            throw error;
        }
        req.user=user;
        next();

    }catch(error){
        console.log("Error occured: ",error);
        next(error)
    }
}