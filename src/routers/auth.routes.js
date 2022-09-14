import express from "express";
import { signUp } from "../controllers/auth.controllers.js";
import { signInValidationSchema } from "../middlewares/signInSchema.middleware.js";
import { userValidationSchema } from "../middlewares/userSchema.middleware.js";

const authRouter = express.Router();

authRouter.post("/sign-up", userValidationSchema, signUp);

authRouter.post("/sign-in", signInValidationSchema )

export { authRouter };
