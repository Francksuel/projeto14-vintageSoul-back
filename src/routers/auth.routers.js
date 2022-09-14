import express from "express";
import { signUp } from "../controllers/auth.controllers.js";
import { userValidationSchema } from "../middlewares/userSchema.middleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", userValidationSchema, signUp);

export { authRouter };
