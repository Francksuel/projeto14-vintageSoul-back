import express from "express";
import { getCart, postCart } from "../controllers/cart.controllers.js";
import { checkUser } from "../middlewares/authorization.middleware.js";
const cartRouter = express.Router();

cartRouter.get("/cart", checkUser,getCart);
cartRouter.post("/cart", checkUser,postCart);

export { cartRouter };