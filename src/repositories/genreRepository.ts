import connection from "../database"
import { genreType } from "../types/genreType"


async function insertNewGenre (name:string) {
    await connection.query('INSERT INTO genres (name) VALUES ($1)', [name])
}

async function findGenreByName (name:string): Promise<Array<genreType>> {
    const getGenres = await connection.query('SELECT * FROM genres WHERE name = $1', [name])
    return getGenres.rows
}

async function getGenresInOrder(): Promise<Array<genreType>> {
    const getGenres = await connection.query('SELECT * FROM genres ORDER BY name ASC') 
    return getGenres.rows
}

export {insertNewGenre, findGenreByName, getGenresInOrder}