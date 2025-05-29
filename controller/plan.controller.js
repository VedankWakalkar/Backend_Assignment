import Plan from "../model/plan.model.js";
import redisClient from "../utils/redisClient.js";

export const createPlan= async(req,res,next)=>{
    try {
        const {name, price, features, duration }=req.body;
        const existingPlan=await Plan.findOne({
            name
        })
        if(existingPlan){
            const error = new Error("Plan already exists!");
            error.statusCode=403;
            throw error;
        }

        const newPlan= await Plan.create({
            ...req.body
        })

        res.status(200).json({
            success:true,
            message:"Plan Created Successfully",
            data:{
                plan:newPlan
            }
        })
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export const getPlans=async(req,res,next)=>{
    const cacheKey='plans:all'
    try {
        const cachedPlans=await redisClient.get(cacheKey);
        if(cachedPlans){
            return res.status(200).json({
                success:true,
                message:"Plans Fetched from Redis Cache",
                data:{
                    Plans:JSON.parse(cachedPlans)
                }
            })
        }
        const plans = await Plan.find().lean()
        if(!plans){
            const error = new Error ("No Plans Found!");
            error.statusCode=404;
            throw error;
        }

        await redisClient.setEx(cachedPlans,3600,JSON.stringify(plans))

        return res.status(200).json({
            success:true,
            message:"All Plans Fetched from Database",
            data:{
                Plans:plans
            }
        })
    } catch (error) {
        console.log("Some Error Occurred: ",error);
        next(error)
    }
}