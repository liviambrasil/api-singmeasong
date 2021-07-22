import connection from "../database"

async function insertNewGenre (name:string) {
    await connection.query('INSERT INTO genres (name) VALUES ($1)', [name])
}

async function findGenreByName (name:string) {
    const getGenres = await connection.query('SELECT * FROM genres WHERE name = $1', [name])
    return getGenres.rows
}

export {insertNewGenre, findGenreByName}