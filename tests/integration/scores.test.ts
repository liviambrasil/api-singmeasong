import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { createGenre } from "../factories/genreFactory";
import { createSong } from "../factories/songFactory";
import { clearDatabase, endConnection } from "../utils/database";

beforeEach (async() => {
  await clearDatabase()
})

afterAll(async() => {
  await endConnection()
})

const agent = supertest(app)

describe("POST /recommendations/:id/upvote" ,() => {
    beforeEach(async() => await createGenre())
    
    it('returns 201 for valid params', async () => {
        await createSong()
        const response = await agent.post("/recommendations/1/upvote");
        expect(response.status).toEqual(201);
    })

    it('returns 400 if the song is not registered', async() => {
        const response = await agent.post("/recommendations/1/upvote");
        expect(response.status).toEqual(400);
    })

    it('returns 400 if the song is not registered', async() => {
        await createSong()
        const response = await agent.post("/recommendations/5/upvote");
        expect(response.status).toEqual(400);
    })

    it('returns 400 for invalid (not a number) param', async() => {
        await createSong()
        const response = await agent.post("/recommendations/wrongparam/upvote");
        expect(response.status).toEqual(400);
    })

    it('verifies if a point has been added to the score', async() => {
        await createSong()
        await agent.post("/recommendations/1/upvote");
        await agent.post("/recommendations/1/upvote");
        const finalScore = await connection.query('SELECT * FROM songs WHERE id = $1', [1])
        expect(finalScore.rows[0].score).toEqual(2);
    })
})

describe("POST /recommendations/:id/downvote" ,() => {
    beforeEach(async() => createGenre())

    it('returns 201 for valid params', async () => {
        await createSong()
        const response = await agent.post("/recommendations/1/downvote");
        expect(response.status).toEqual(201);
    })
    it('returns 400 if the song is not registered', async() => {
        const response = await agent.post("/recommendations/1/downvote");
        expect(response.status).toEqual(400);
    })

    it('returns 400 if the song is not registered', async() => {
        await createSong()
        const response = await agent.post("/recommendations/5/downvote");
        expect(response.status).toEqual(400);
    })

    it('returns 400 for invalid (not a number) param', async() => {
        await createSong()
        const response = await agent.post("/recommendations/wrongparam/downvote");
        expect(response.status).toEqual(400);
    })

    it('verifies if a point has been delete to the score', async() => {
        await createSong()
        await agent.post("/recommendations/1/downvote");
        const finalScore = await connection.query('SELECT * FROM songs WHERE id = $1', [1])
        expect(finalScore.rows[0].score).toEqual(-1);
    })

    it('verifies if a song has been delete if the score is lower than -5', async() => {
        await createSong()

        await agent.post("/recommendations/1/downvote");
        await agent.post("/recommendations/1/downvote");
        await agent.post("/recommendations/1/downvote");
        await agent.post("/recommendations/1/downvote");
        await agent.post("/recommendations/1/downvote");
        await agent.post("/recommendations/1/downvote");

        const finalScore = await connection.query('SELECT * FROM songs WHERE id = $1', [1])
        expect(finalScore.rows.length).toEqual(0);
    })
})