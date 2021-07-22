import connection from "../database"
import { findMusicById } from "./recommendationsRepository"

async function addPoint (songId:number) {
    await connection.query("UPDATE songs SET score = score + 1 WHERE id = $1", [songId])
}

async function dislike (songId:number) {
    await connection.query("UPDATE songs SET score = score - 1 WHERE id = $1", [songId])
}

async function deleteSongOrNot (songId:number) {
    const music:Array<{id:number, name:string, link:string, score:number}> = await findMusicById(songId)

    if(music[0].score > -5) return false

    await connection.query('DELETE FROM songs WHERE id = $1', [songId])
}

export {addPoint, dislike, deleteSongOrNot}