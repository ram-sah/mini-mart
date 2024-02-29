import express from 'express'
import { loginController, registerController, testController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router()

//routing / Register
router.post('/register', registerController)

//Login - post
router.post('/login', loginController);

//test
router.get('/test', requireSignIn, isAdmin, testController);

export default router;
