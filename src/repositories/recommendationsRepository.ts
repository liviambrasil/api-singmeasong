import connection from "../database"
import { insertSongType, responseSongType } from "../types/songType"

async function insertNewSong ({name, genresIds, youtubeLink}: insertSongType) {
    await connection.query("INSERT INTO songs (name, link, score) VALUES ($1, $2, $3)", 
                            [name, youtubeLink, 0])
    const songId = await connection.query("SELECT id FROM songs WHERE name = $1", [name])

    genresIds.map(async (e: number) => {
        await connection.query(`INSERT INTO "songs_genre" ("songId", "genreId") 
                                VALUES ($1, $2)`, 
                                [songId.rows[0].id, e])
    })
}

async function findMusicByLink (youtubeLink:string): Promise<Array<responseSongType>> {
    const getMusicByLink = await connection.query("SELECT * FROM songs WHERE link = $1", [youtubeLink])
    return getMusicByLink.rows
}

async function findMusicById (songId:number): Promise<Array<responseSongType>> {
    const getMusicById = await connection.query("SELECT * FROM songs WHERE id = $1", [songId])
    return getMusicById.rows
}

async function getAllSongs(): Promise<Array<responseSongType>> {
    const getSongs = await connection.query("SELECT * FROM songs")
    return getSongs.rows
}

async function getAllSongsDescScore(amount:Number): Promise<Array<responseSongType>> {
    const getSongs = await connection.query("SELECT * FROM songs ORDER BY score DESC LIMIT $1", [amount])
    return getSongs.rows
}


export { insertNewSong, findMusicByLink, findMusicById, getAllSongs, getAllSongsDescScore }