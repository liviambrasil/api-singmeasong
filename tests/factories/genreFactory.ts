import connection from "../../src/database"
import faker from "faker"

export async function createGenre () {
    await connection.query("INSERT INTO genres (name) VALUES ($1)", [faker.music.genre()])
}