import "./setup"
import express from "express";
import cors from "cors";
import { addMusic, getRandomSong, getTopMusics } from "./controllers/recommendationController";
import { addScore, dislikeSong } from "./controllers/scoreController";
import { addGenre, getGenres } from "./controllers/genresControllers";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", addMusic);
app.post("/recommendations/:id/upvote", addScore);
app.post("/recommendations/:id/downvote", dislikeSong)
app.get("/recommendations/random", getRandomSong)
app.get("/recommendations/top/:amount", getTopMusics)
app.post("/genres", addGenre)
app.get("/genres", getGenres)

export default app;
