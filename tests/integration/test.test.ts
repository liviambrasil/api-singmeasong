import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { clearDatabase, endConnection } from "../utils/database";

beforeEach (async() => {
  await clearDatabase()
})

afterAll(async() => {
  await endConnection()
})

const agent = supertest(app)

describe("GET /test", () => {

  beforeEach(async() => {
    await connection.query("INSERT INTO genres (name) VALUES ($1)", ["MPB"])
  })

  function generateSongBody () {
    return {"name": "Vambora",
            "youtubeLink": "https://music.youtube.com/watch?v=W08GxWYBBBw&feature=share",
            "genresIds": [1]}
  }

  it('returns status 201 for valid params', async () => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toEqual(201);
  });

  it('returns status 409 for duplicate song', async() => {
    const body = generateSongBody()

    await agent.post("/recommendations").send(body);
    const response = await agent.post("/recommendations").send(body);
    expect(response.status).toEqual(409);
  })

  it('returns status 400 for invalid name', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, name:123});
    expect(response.status).toEqual(400);
  })
});
