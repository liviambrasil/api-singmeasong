import "./setup"
import express from "express";
import cors from "cors";
import { addMusic, getRandomSong } from "./controllers/recommendationController";
import { addScore, dislikeSong } from "./controllers/scoreController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", addMusic);
app.post("/recommendations/:id/upvote", addScore);
app.post("/recommendations/:id/downvote", dislikeSong)
app.get("/recommendations/random", getRandomSong)

export default app;
