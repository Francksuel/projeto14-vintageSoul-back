import express from "express";
import {
	editUserAdress,
	getUserAddress,
} from "../controllers/user.controller.js";
import { checkUser } from "../middlewares/authorization.middleware.js";

const userRouter = express.Router();

userRouter.get("/user", checkUser, getUserAddress);
userRouter.put("/user", checkUser, editUserAdress);

export { userRouter };
