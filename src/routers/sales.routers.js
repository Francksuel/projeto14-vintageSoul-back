import express from "express";
import { finalizePurchase } from "../controllers/sales.controllers";
import { checkUser } from "../middlewares/authorization.middleware";

const salesRouter = express.Router();

salesRouter.post("/sales", checkUser, finalizePurchase);

export { salesRouter };
