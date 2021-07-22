import { Request, Response } from "express"
import { addPoint, findMusicById, findMusicByLink, insertNewSong } from "../repositories/recommendationsRepository"
import { postSongSchema } from "../schemas/recommendationSchemas"

async function addMusic (req:Request, res:Response) {
    const { name, genresIds, youtubeLink } = req.body

    const { error } = postSongSchema.validate(req.body)
    if(error) return res.status(400).send({ error: error.details[0].message })

    try{
        const verifyIfExists = await findMusicByLink(youtubeLink)
        if(verifyIfExists.length) return res.sendStatus(409)

        await insertNewSong(name, genresIds, youtubeLink)
        res.sendStatus(201)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

async function addScore (req:Request, res:Response) {
    const songId:number = Number(req.params)

    const { error } = postSongSchema.validate({songId})
    if(error) return res.status(400).send({ error: error.details[0].message })

    try {
        const verifyMusic = await findMusicById(songId)
        if(verifyMusic.length) return res.sendStatus(400)

        addPoint(songId)
        res.sendStatus(201)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export { addMusic, addScore }