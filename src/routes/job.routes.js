import { Router } from "express";
import { 
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
} from "../controllers/job.contoller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post( createJob);
router.route("/").get( getJobs);

router.route("/:id").get( getJobById);
router.route("/:id").put(updateJob);
router.route("/:id").delete(deleteJob);

export default router;