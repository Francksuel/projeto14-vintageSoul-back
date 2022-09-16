import express from "express";
import { getProducts, postProduct } from "../controllers/products.controllers.js";
import { productValidationSchema } from "../middlewares/productSchema.middleware.js";

const productsRouter = express.Router();

productsRouter.post("/products", productValidationSchema, postProduct);

productsRouter.get("/products", getProducts);

export { productsRouter };