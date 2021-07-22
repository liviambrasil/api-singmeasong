import faker from "faker"

export function generateSongBody () {

    return {name: faker.name.title(),
            youtubeLink: faker.internet.url(),
            genresIds: [1]}
}