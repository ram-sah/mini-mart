import express from "express"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, CreateCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router()

//routes
//create category
router.post('/create-category', requireSignIn, isAdmin, CreateCategoryController);

//update category
 router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController);

//get all category
router.get('/get-category', categoryController)
//Single category
router.get('/single-category/:slug', singleCategoryController)

export default router;
