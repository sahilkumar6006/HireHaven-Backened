


import express from 'express'
import { RegisterEmployer } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/employerSignUp',RegisterEmployer);

export default router;