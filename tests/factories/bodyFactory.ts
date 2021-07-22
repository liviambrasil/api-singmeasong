import faker from "faker"

function generateSongBody () {

    return {name: faker.name.title(),
            youtubeLink: faker.internet.url(),
            genresIds: [1]}
}

function generateGenreBody () {
    return {name: faker.music.genre()}
}

export {generateSongBody, generateGenreBody}