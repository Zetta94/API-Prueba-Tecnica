import { Request, Response } from 'express'
import MovieService from '../services/movie.services'

const service = new MovieService()

//Controladores para API
export const getMovieAPI = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1
      const movies = await service.getMoviesFromAPI(page)
      res.status(201).json({message: "Success", payload: movies})
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch movies' })
    }
}

export const searchMovieByTitle = async (req: Request, res: Response) => {
  try {
    const { title } = req.body
    const movie = await service.searchMoviesByTitle(title)
    res.status(201).json({message: "Success", payload: movie})
  } catch (error) {
    res.status(500).json({ error: 'Error buscando la película por título' })
  }
}

//Controladores para DB
export const getMovieFromId = async (req: Request, res: Response) => {
    try {
      const {id} = req.params
      const movie = await service.getMovieFromIdDB(id)
      if (movie) {
        res.status(201).json({message: "Success", payload: movie})
      } else {
        res.status(404).json({ error: 'Movie not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the movie' })
    }
}

export const getAllMoviesDB = async(req:Request, res:Response)=>{
    try {
      const movies = await service.getAllMoviesDB()
      if (movies) {
        res.status(201).json({message: "Success", payload: movies})
      } else {
        res.status(404).json({ error : "Movies not found" })
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the movie' })
    }
}

export const createMovie = async (req:Request, res:Response)=>{
    try {
      const query = req.body
      console.log(req.body)
      const movie = await service.createMovieToDB(query)
      if (movie) {
        res.status(201).json({message: "Success", payload: movie})
      } else {
        res.status(404).json({ error : "Movies not create" })
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to create the movie"})
    }
}

export const deleteMovieFromId = async(req:Request, res: Response)=>{
    try {
      const {id} = req.params
      const movie = await service.deleteMovieFromDB(id)
      if (movie) {
        res.status(201).json({message: "Success", Status: "Movie deleted"})
      } else {
        res.status(404).json({ error: 'Movie not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the movie' })
    }
}

export const updateMovie = async(req:Request, res: Response)=>{
  try {
    const { id } = req.params
    const { propertyName, newValue } = req.body

    if (!propertyName || newValue === undefined) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    const updatedMovie = await service.updateMovieProperty(id, propertyName, newValue)

    if (updatedMovie) {
      res.status(200).json({ message: 'Success', updatedProperty: {[propertyName] : newValue}})
    } else {
      res.status(404).json({ error: 'Movie not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the movie' })
  }
}