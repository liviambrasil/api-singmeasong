import connection from "../database"

async function insertNewSong (name:string, genresIds:number[], youtubeLink:string) {
    await connection.query("INSERT INTO songs (name, link, score) VALUES ($1, $2, $3)", 
                            [name, youtubeLink, 0])
    const songId = await connection.query("SELECT id FROM songs WHERE name = $1", [name])

    genresIds.map(async (e: number) => {
        await connection.query(`INSERT INTO "songs_genre" ("songId", "genreId") 
                                VALUES ($1, $2)`, 
                                [songId.rows[0].id, e])
    })
}

async function findMusicByLink (youtubeLink:string) {
    const getMusicByLink = await connection.query("SELECT * FROM songs WHERE link = $1", [youtubeLink])
    return getMusicByLink.rows
}

async function findMusicById (songId:number) {
    const getMusicById = await connection.query("SELECT * FROM songs WHERE id = $1", [songId])
    return getMusicById.rows
}


export { insertNewSong, findMusicByLink, findMusicById }