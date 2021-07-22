import {Request, Response} from 'express'
import { findGenreByName, insertNewGenre } from '../repositories/genreRepository'
import { genreSchema } from '../schemas/genresSchema'

async function addGenre (req: Request, res:Response) {
    const {name} = req.body

    const { error } = genreSchema.validate(req.body)
    if(error) return res.status(400).send({ error: error.details[0].message })

    try{
        const verifyIfExists = await findGenreByName(name)
        if(verifyIfExists.length) return res.sendStatus(409)

        await insertNewGenre(name)
        res.sendStatus(201)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export {addGenre}