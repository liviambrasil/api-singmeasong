import { Request, Response } from 'express'
import { findGenreByName, getGenresInOrder, insertNewGenre } from '../repositories/genreRepository'
import { genreSchema } from '../schemas/genresSchema'
import { genreType } from '../types/genreType'

async function addGenre (req: Request, res:Response) {
    const {name}: genreType = req.body

    const { error } = genreSchema.validate(req.body)
    if(error) return res.status(400).send({ error: error.details[0].message })

    try{
        const verifyIfExists: Array<genreType> = await findGenreByName(name)
        if(verifyIfExists.length) return res.sendStatus(409)

        await insertNewGenre(name)
        res.sendStatus(201)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

async function getGenres(req:Request, res: Response) {
    try {
        const genres: Array<genreType> = await getGenresInOrder()
        if(!genres.length) return res.sendStatus(404)
        res.send(genres)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export {addGenre, getGenres}