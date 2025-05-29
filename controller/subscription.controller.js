import mongoose from "mongoose"
import Subscription from "../model/subscription.model.js";
import Plan from "../model/plan.model.js";
import redisClient from "../utils/redisClient.js";

export const createSubscription = async(req,res,next)=>{
    const session=await mongoose.startSession();
    try {
        session.startTransaction()
        const {planId}=req.body;
        const userId=req.user._id;

        const plan=await Plan.findById(planId)
        if(!plan){
            const error = new Error("Selected Plan does not exist")
            error.statusCode=403;
            throw error
        }

        const existing =await Subscription.findOne({
            user:userId,
            status:"ACTIVE"
        })
        if(existing){
            const error= new Error("User already has an active subscription")
            error.statusCode=403;
            throw error
        }
        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + plan.duration);

        const newSubscription = await Subscription.create([{
            user: userId,
            plan: planId,
            startDate,
            endDate,
            status: "ACTIVE"
        }], { session });
        await session.commitTransaction();
        session.endSession();
        
        res.status(200).json({
            success:true,
            message:"Subcription Created Successfully",
            data:newSubscription[0]
        })
   } catch (error) {
        console.log("Some Error Has Occured : ", error)
        await session.abortTransaction();
        session.endSession();
        next(error)
   }
}

export const getSubscription= async(req,res,next)=>{
    const {userId}=req.params;
    const cacheKey=`subscriptions:${userId}`

    try {

        const cachedSubscription=await redisClient.get(cacheKey);
        
        if(cachedSubscription){
            return res.status(200).json({
                success:true,
                message:"Subscription Fetched from the Redis cache",
                data:
                    JSON.parse(cachedSubscription)
            })
        }

        const subscription = await Subscription.findOne({
            user: userId,
            status: "ACTIVE"
        }).populate('plan').lean();

        if(!subscription){
            return res.status(404).json({
                success:false,
                message:"Subscription not Found"
            })
        }

        await redisClient.setEx(cacheKey,3600,JSON.stringify(subscription));
        return res.status(200).json({
            success:true,
            message:"Subscription fetched from database",
            data:subscription
        })

    } catch (error) {
        console.log("Some Error Has Occured: ",error);
        next(error)
    }
}

export const updateSubscription=async(req,res,next)=>{
    const {userId}=req.params;
    try {
        const subscription = await Subscription.findOne({ user: userId, status: "ACTIVE" });
        if(!subscription){
            const error = new Error(`No active subscription found for userId: ${userId}`);
            error.statusCode=404
            throw error
        }

        const updatedSub=await Subscription.findOneAndUpdate({user: userId}, req.body,{new :true}  )
        res.status(200).json({
            success:true,
            message:"Updated Subscription Successfully",
            data:{
                UpdatedSubscription:updatedSub
            }
        })

    } catch (error) {
        console.log("Some Error Occurred: ",error);
        next(error)
    }
}

export const deleteSubscription= async(req,res,next)=>{
    const {userId}= req.params;
    try {
        const isExistSub=await Subscription.findOne({user:userId,status:"ACTIVE"});
        if(!isExistSub){
            const error = new Error ("No Subscription Found with this user Id: ",userId);
            error.statusCode=404;
            throw error;
        }
        await Subscription.findOneAndUpdate(
            { user: userId, status: "ACTIVE" },
            { status: "CANCELLED" },
            { new: true }
        );
        res.status(200).json({
            success:true,
            message:"Subscription Deleted Successfully"
        })
    } catch (error) {
        console.log("Some Error Occurred : ", error);
        next(error)
    }
}