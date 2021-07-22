import joi from "joi"

const postSongSchema = joi.object({
    name: joi.string().required(),
    genresIds: joi.array().required(),
    youtubeLink: joi.string().uri().required()
})

export { postSongSchema }