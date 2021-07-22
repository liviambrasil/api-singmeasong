import { paramIdSchema } from "../schemas/recommendationSchemas"
import {Response, Request} from 'express'
import { findMusicById } from "../repositories/recommendationsRepository"
import { addPoint, deleteSongOrNot, dislike } from "../repositories/scoreRepository"

async function addScore (req:Request, res:Response) {
    const songId:number = Number(req.params.id)

    const { error } = paramIdSchema.validate({id: songId})
    if(error) return res.status(400).send({ error: error.details[0].message })

    try {
        const verifyMusic = await findMusicById(songId)
        if(!verifyMusic.length) return res.sendStatus(400)
        
        await addPoint(songId)
        res.sendStatus(201)
    }
    catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

async function dislikeSong (req:Request, res:Response) {
    const songId:number = Number(req.params.id)

    const { error } = paramIdSchema.validate({id: songId})
    if(error) return res.status(400).send({ error: error.details[0].message })

    try {
        const verifyMusic = await findMusicById(songId)
        if(!verifyMusic.length) return res.sendStatus(400)
        
        await dislike(songId)
        await deleteSongOrNot(songId)

        res.sendStatus(201)
    }
    catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export { addScore, dislikeSong }