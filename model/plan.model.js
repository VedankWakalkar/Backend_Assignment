import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Plan name is required"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Plan price is required"]
  },
  features: {
    type: [String],
    default: []
  },
  duration: {
    type: Number,
    required: [true, "Plan duration is required"]
  }
}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);
export default Plan;