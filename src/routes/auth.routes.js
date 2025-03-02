


import express from 'express'
import { RegisterEmployee, RegisterEmployer, SignIn } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/employerSignUp',RegisterEmployer);
router.post('/employeeSignUp',RegisterEmployee);
router.post('/SignIn',SignIn)


export default router;