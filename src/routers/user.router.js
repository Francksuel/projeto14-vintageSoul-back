import express from "express";
import { editUserAdress } from "../controllers/user.controller.js";
import { checkUser } from "../middlewares/authorization.middleware.js";

const userRouter = express.Router();

userRouter.get("/user", checkUser, )
userRouter.put("/user", checkUser, editUserAdress )

export { userRouter };