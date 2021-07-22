async function selectSong (songs:Array<{id:number, name:string, link:string, score:number}>) {

    if (!songs.length) return null

    if (Math.random() * 100 < 70) {
        const bestSongs = songs.filter(e => e.score > 10)
        return songs[Math.floor(Math.random()*bestSongs.length)]
    }

    if (Math.random() * 100 < 30) {
        const songsJustOk = songs.filter(e => e.score > 5 && e.score < 10)
        return songs[Math.floor(Math.random()*songsJustOk.length)]
    }

    return songs[Math.floor(Math.random()*songs.length)]
}

export {selectSong}