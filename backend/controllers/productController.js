import productModel from '../models/productModel';
import fs from 'fs';
export const createProductController = async (req, res) => {
    try {
        const { name, slug,description,  price, category, quantity, shipping } = req.fields;
        const {photo} = req.files;
        const products = await (productModel)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error is creating product"
        })
    }
}
