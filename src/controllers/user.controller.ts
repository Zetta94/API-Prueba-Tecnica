import { Request, Response } from 'express'
import userService from '../services/user.services'

const service = new userService()

export const addFavouriteMovie = async (req: Request, res: Response) => {
    try {
        const {uid,mid} = req.params
        const updatedUser = await service.addFavouriteMovie(uid,mid)
        res.status(200).json({ message: 'Movie added to favourites', payload: updatedUser })
    } catch (error) {
        res.status(500).json({ error: 'Failed to add movie to favourites' })
    }
}
  
export const removeFavouriteMovie = async (req: Request, res: Response) => {
    try {
        const {uid,mid} = req.params
        const updatedUser = await service.removeFavouriteMovie(uid,mid)
        res.status(200).json({ message: 'Movie removed from favourites', payload: updatedUser })
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove movie from favourites' })
    }
}

export const shearchFavourites = async (req: Request, res: Response) => {
    try {
        const {uid} = req.params
        const favouritesMovies = await service.getFavourites(uid)
        res.status(200).json({ message: 'Favourites Movies', payload: favouritesMovies })
    } catch (error) {
        res.status(500).json({ error: 'Failed to find movies from favourites' })
    }
}