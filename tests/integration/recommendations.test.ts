import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";
import { generateSongBody } from "../factories/bodyFactory";
import { createGenre } from "../factories/genreFactory";
import { clearDatabase, endConnection } from "../utils/database";

beforeEach (async() => {
  await clearDatabase()
})

afterAll(async() => {
  await endConnection()
})

const agent = supertest(app)

describe("POST /recommendations", () => {

  beforeEach(async() => await createGenre())

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
  it('returns status 400 for empty name', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, name:""});
    expect(response.status).toEqual(400);
  })
  it('returns status 400 for invalid (not a string) youtube link', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, youtubeLink:123});
    expect(response.status).toEqual(400);
  })
  it('returns status 400 for invalid (not a url format) youtube link', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, youtubeLink:"whongformat"});
    expect(response.status).toEqual(400);
  })
  it('returns status 400 for empty youtube link', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, youtubeLink:""});
    expect(response.status).toEqual(400);
  })
  it('returns status 400 for invalid (not a array) musical genre id', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, genresId:1});
    expect(response.status).toEqual(400);
  })
  it('returns status 400 for invalid (not a array of numbers) musical genre id', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, genresId:["wrongformat"]});
    expect(response.status).toEqual(400);
  })
  it('returns status 400 for invalid (empty array) musical genre id', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, genresId:[]});
    expect(response.status).toEqual(400);
  })
  it('returns status 400 for empty musical genre id', async() => {
    const body = generateSongBody()

    const response = await agent.post("/recommendations").send({...body, genresId:""});
    expect(response.status).toEqual(400);
  })
});
