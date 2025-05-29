import { createClient } from "redis";
import { REDIS_URI } from "../config/env.js";

const redisClient=createClient({
    url:REDIS_URI
})

redisClient.on('error',(err)=>{
    console.log('Some Error Occured in Redis: ',err)
})

await redisClient.connect();

export default redisClient;