


import express from 'express'
import { RegisterEmployee, RegisterEmployer } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/employerSignUp',RegisterEmployer);
router.post('/employeeSignUp',RegisterEmployee);


export default router;