import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username :{
        type:String,
        required:[true,"Username is require"],
        trim:true,
        minLength:2,
        maxLength:20
    },
    Password:{
        type:String,
        required:[true,"Password is required"],
        minLength:6
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    subscriptions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subscription"
    }]
},{timestamps:true})

const User= mongoose.model("User",userSchema);
export default User;