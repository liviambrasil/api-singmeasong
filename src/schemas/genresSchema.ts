import joi from "joi"

const genreSchema = joi.object({
    name: joi.string().required(),
})

export {genreSchema}