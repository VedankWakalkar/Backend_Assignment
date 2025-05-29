import { Router } from "express";
import { createPlan, getPlans } from "../controller/plan.controller.js";
import { auhtorize } from "../middleware/auth.middleware.js";

const planRouter=Router();

planRouter.post("/plans",auhtorize,createPlan)
planRouter.get("plans",auhtorize,getPlans)

export default planRouter;