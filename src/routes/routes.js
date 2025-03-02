import { Router } from "express";

import jobRoutes from "./job.routes.js";
import Authroutes from './auth.routes.js'
import userRoutes from './user.routes.js'

const router = Router();

router.use("/job", jobRoutes);
router.use("/auth",Authroutes)
router.use("/user",userRoutes)

export default router;