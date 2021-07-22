import "./setup"
import express from "express";
import cors from "cors";
import { addMusic, addScore } from "./controllers/recommendationController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", addMusic);
app.post("/recommendations/:id/upvote", addScore);

export default app;
