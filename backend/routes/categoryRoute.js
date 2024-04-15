import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { CreateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

//routes
router.post('create-category', requireSignIn, isAdmin, CreateCategoryController)

export default router;
