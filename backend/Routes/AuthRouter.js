import express from 'express';
import { signupValidation,loginValidation } from '../MIddlewares/AuthValidation.js';
import { signup,login } from '../Controllers/AuthController.js';
const router = express.Router();
router.post('/signup',signupValidation,signup);
router.post('/login',loginValidation,login);

export {router};