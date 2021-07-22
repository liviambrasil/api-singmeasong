import connection from "../../src/database"

export async function createGenre () {
    await connection.query("INSERT INTO genres (name) VALUES ($1)", ["MPB"])
}