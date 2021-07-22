import supertest from "supertest";
import app from "../../src/app";
import { generateGenreBody } from "../factories/bodyFactory";
import { clearDatabase, endConnection } from "../utils/database";

beforeEach (async() => {
    await clearDatabase()
  })
  
  afterAll(async() => {
    await endConnection()
  })
  
  const agent = supertest(app)

  describe("POST /genres", () => {
      
    it('returns status 201 for valid params', async () => {
        const body = generateGenreBody()
        
        const response = await agent.post("/genres").send(body);
        expect(response.status).toEqual(201);
    })
    it('returns 409 for duplicate genre name', async() => {
        const body = generateGenreBody()
        
        await agent.post("/genres").send(body);
        const response = await agent.post("/genres").send(body);
        expect(response.status).toEqual(409);
    })
    it('returns status 400 for invalid name', async () => {
        const body = generateGenreBody()
        
        const response = await agent.post("/genres").send({...body, name:123});
        expect(response.status).toEqual(400);
    })
    it('returns status 400 for empty name', async() => {
        const body = generateGenreBody()
        
        const response = await agent.post("/genres").send({...body, name:""});
        expect(response.status).toEqual(400);
    })
  })