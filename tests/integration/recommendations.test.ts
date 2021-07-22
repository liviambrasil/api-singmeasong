import supertest from "supertest";
import app from "../../src/app";
import { generateSongBody } from "../factories/bodyFactory";
import { createGenre } from "../factories/genreFactory";
import { createSong, populateTableSongs } from "../factories/songFactory";
import { clearDatabase, endConnection } from "../utils/database";
import { vote } from "../utils/score";

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


describe("GET /recommendations/random", () => {

  beforeEach(async() => await createSong())

  it('returns status 200 for valid params', async () => {
    const response = await agent.get("/recommendations/random");
    expect(response.status).toEqual(200);
  })
  it('returns status 404 when there is no songs on the list', async() => {
    await clearDatabase()

    const response = await agent.get("/recommendations/random");
    expect(response.status).toEqual(404);
  })
  it('returns one song recommended with 4 infos', async () => {
    const response = await agent.get("/recommendations/random");
    expect(Object.keys(response.body).length).toEqual(4)
  })
  it('returns one song recommended with right format infos', async () => {
    const response = await agent.get("/recommendations/random");
    expect(response.body)
    .toEqual(expect.objectContaining(
      {id: expect.any(Number), 
      name: expect.any(String),
      link: expect.any(String),
      score: expect.any(Number)})
    )
  })
})

describe("GET /recommendations/top/:amount", () => {

  beforeEach(async() => await populateTableSongs())

  it('returns status 200 for valid params', async () => {
    const response = await agent.get("/recommendations/top/1");
    expect(response.status).toEqual(200);
  })
  it('returns the amount of songs designated on the url param', async() => {
    const response = await agent.get("/recommendations/top/3");
    expect(response.body.length).toEqual(3);
  })
  it('returns the songs in decrescent order by score', async() => {
    await vote();

    const response = await agent.get("/recommendations/top/3")
    const songs = response.body
    expect(songs[0].score > songs[1].score && songs[1].score > songs[2].score).toEqual(true)
  })
  it('returns a array of songs in object format', async () => {
    const response = await agent.get("/recommendations/top/3");
    expect(response.body).toEqual(expect.any(Array))
  })
  it('returns songs with right format infos', async () => {
    const response = await agent.get("/recommendations/top/3");
    expect(response.body[0])
    .toEqual(expect.objectContaining(
      {id: expect.any(Number), 
      name: expect.any(String),
      link: expect.any(String),
      score: expect.any(Number)})
    )
  })
})
