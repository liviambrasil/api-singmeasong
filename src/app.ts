import "./setup"
import express from "express";
import cors from "cors";
import { addMusic } from "./controllers/recommendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", addMusic);

export default app;
