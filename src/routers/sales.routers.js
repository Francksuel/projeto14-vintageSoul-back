import express from "express";
import { finalizePurchase } from "../controllers/sales.controllers.js";
import { checkUser } from "../middlewares/authorization.middleware.js";

const salesRouter = express.Router();

salesRouter.post("/sales", checkUser, finalizePurchase);

export { salesRouter };
