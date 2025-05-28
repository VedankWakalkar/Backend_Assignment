import mongoose from "mongoose";
import { DB_URI,NODE_ENV } from "../config/env.js";

// console.log(DB_URI)

if(!DB_URI){
    console.log("Checking for the Database connection string: ",DB_URI)
    throw new Error('Please Provide the Db_URI in the env file!')
}

const connectToDatabase= async()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to the Database in the ${NODE_ENV} mode`)
    }catch(error){
        console.log("Error Occured: " ,error)
        process.exit(1);
    }
}

export default connectToDatabase;