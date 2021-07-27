import { responseSongType } from "../types/songType"


async function selectSong (songs:Array<responseSongType>): Promise<responseSongType> {

    if (!songs.length) return null

    if (Math.random() * 100 < 70) {
        const bestSongs:Array<responseSongType> = songs.filter(e => e.score > 10)
        return songs[Math.floor(Math.random()*bestSongs.length)]
    }

    if (Math.random() * 100 < 30) {
        const songsJustOk:Array<responseSongType> = songs.filter(e => e.score > 5 && e.score < 10)
        return songs[Math.floor(Math.random()*songsJustOk.length)]
    }

    return songs[Math.floor(Math.random()*songs.length)]
}

export {selectSong}