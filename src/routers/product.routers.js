import express from "express";
import { getProduct } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/product/:idProduct",getProduct);

export { productRouter };