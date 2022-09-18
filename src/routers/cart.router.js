import express from "express";
import { getCart } from "../controllers/cart.controllers.js";
import { checkUser } from "../middlewares/authorization.middleware.js";
const cartRouter = express.Router();

cartRouter.get("/cart", checkUser,getCart);

export { cartRouter };