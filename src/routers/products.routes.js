import express from "express";
import { productValidationSchema } from "../middlewares/productSchema.middleware.js";

const productsRouter = express.Router();

productsRouter.post("/products", productValidationSchema);

export { productsRouter };