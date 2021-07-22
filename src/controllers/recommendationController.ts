import { Request, Response } from "express"
import { findMusicByLink, getAllSongs, insertNewSong } from "../repositories/recommendationsRepository"
import { postSongSchema } from "../schemas/recommendationSchemas"
import { selectSong } from "../services/recommendationsService"

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

async function getRandomSong (req:Request, res:Response) {
    const songs:Array<{id:number, name:string, link:string, score:number}> = await getAllSongs()

    try{
        const recommendation = await selectSong(songs)
        if(!recommendation) return res.sendStatus(404)
        console.log(recommendation)
        res.send(recommendation)
    }
    catch (e){
        console.log(e)
        res.sendStatus(500)
    }
}

export { addMusic, getRandomSong }