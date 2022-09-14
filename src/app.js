import express from "express";
import cors from "cors";
import { authRouter } from "./routers/auth.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

export default app;