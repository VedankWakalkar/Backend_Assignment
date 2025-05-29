import { Router } from "express";
import { auhtorize } from "../middleware/auth.middleware.js";
import { createSubscription, deleteSubscription, getSubscription, updateSubscription } from "../controller/subscription.controller.js";

const userRouter=Router();

userRouter.post('/subscription',auhtorize,createSubscription)
userRouter.get('/subscription/:userId',auhtorize,getSubscription)
userRouter.put('/subscription/:userId',auhtorize,updateSubscription)
userRouter.delete('/subscription/:userId',auhtorize,deleteSubscription)

export default userRouter;