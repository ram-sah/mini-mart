import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
    braintreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    relatedProductController,
    searchProductController,
    updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//create product routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);
//update product routes
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

//get products
router.get("/get-product", getProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);
//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get('/product-count', productCountController);

//product per page
router.get('/product-list/:page', productListController);

//search
router.get('/search/:keyword', searchProductController);

//similar product
router.get('/related-product/:pid/:cid', relatedProductController);

// product categories
router.get('/product-category/:slug', productCategoryController);

//payment route
//token from braintree payment method
router.get("/braintree/token", braintreeTokenController);

//Payment with braintree
router.post("/braintree/payment", requireSignIn, braintreePaymentController);



export default router;
