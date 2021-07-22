import connection from "../../src/database"
import { generateSongBody } from "./bodyFactory"

export async function createSong () {
    const {name, youtubeLink} = generateSongBody()
    await connection.query("INSERT INTO songs (name, link, score) VALUES ($1, $2, $3)",
                            [name, youtubeLink, 0])
}