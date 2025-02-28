


import express from 'express'
import { RegisterEmployee, RegisterEmployer,EmployeeSignIn, EmployerSignIn } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/employerSignUp',RegisterEmployer);
router.post('/employeeSignUp',RegisterEmployee);
router.post('/employeeSignIn',EmployeeSignIn)
router.post('/employerSignIn',EmployerSignIn)


export default router;