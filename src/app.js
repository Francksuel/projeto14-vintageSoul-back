import express from "express";
import cors from "cors";
import { authRouter } from "./routers/auth.routers.js";
import { cartRouter } from "./routers/cart.router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(cartRouter);

export default app;