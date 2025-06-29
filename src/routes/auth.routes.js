import express from 'express';
import { RegisterEmployee, RegisterEmployer, SignIn } from '../controllers/auth.controller.js';

const router = express.Router();

/**
 * @swagger
 * /auth/employerSignUp:
 *   post:
 *     summary: Register a new employer
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *               - email
 *               - password
 *             properties:
 *               companyName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Employer registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/employerSignUp', RegisterEmployer);

/**
 * @swagger
 * /auth/employeeSignUp:
 *   post:
 *     summary: Register a new employee
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Employee registered successfully
 *       400:
 *         description: Bad request
 */
router.post('/employeeSignUp', RegisterEmployee);

/**
 * @swagger
 * /auth/SignIn:
 *   post:
 *     summary: Sign in user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/SignIn', SignIn);

export default router;