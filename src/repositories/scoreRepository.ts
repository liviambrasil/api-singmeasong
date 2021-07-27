import connection from "../database"
import { responseSongType } from "../types/songType"
import { findMusicById } from "./recommendationsRepository"

async function addPoint (songId:number) {
    await connection.query("UPDATE songs SET score = score + 1 WHERE id = $1", [songId])
}

async function dislike (songId:number) {
    await connection.query("UPDATE songs SET score = score - 1 WHERE id = $1", [songId])
}

async function deleteSongOrNot (songId:number) {
    const music:Array<responseSongType> = await findMusicById(songId)

    if(music[0].score > -5) return false

    await connection.query('DELETE FROM songs WHERE id = $1', [songId])
}

export {addPoint, dislike, deleteSongOrNot}