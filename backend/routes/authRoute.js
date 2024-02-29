import express from 'express'
import { loginController, registerController } from '../controllers/authController.js'

const router = express.Router()

//routing / Register
router.post('/register', registerController)

//Login - post
router.post('/login', loginController);

export default router;
