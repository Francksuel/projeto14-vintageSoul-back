import express from "express";
import { deleteItemCart, deleteUserCart, getCart, postCart } from "../controllers/cart.controllers.js";
import { checkUser } from "../middlewares/authorization.middleware.js";
const cartRouter = express.Router();

cartRouter.get("/cart", checkUser, getCart);
cartRouter.post("/cart", checkUser, postCart);
cartRouter.delete("/cart/:idItem", checkUser, deleteItemCart );
cartRouter.delete("/cart", checkUser, deleteUserCart)

export { cartRouter };