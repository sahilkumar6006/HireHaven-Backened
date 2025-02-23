import { Router } from "express";

import jobRoutes from "./job.routes.js";
import Authroutes from './auth.routes.js'

const router = Router();

router.use("/job", jobRoutes);
router.use("/auth",Authroutes)

export default router;