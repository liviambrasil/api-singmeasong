import joi from "joi"

const postSongSchema = joi.object({
    name: joi.string().required(),
    genresIds: joi.array().items(joi.number()).required(),
    youtubeLink: joi.string().uri().required()
})

const paramIdSchema = joi.object({
    songId: joi.number().integer().positive().required()
})

export { postSongSchema }