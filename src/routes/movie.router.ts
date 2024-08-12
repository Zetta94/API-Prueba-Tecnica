import { Router } from 'express';
import { getMovieFromId, getMovieAPI, getAllMoviesDB, createMovie,deleteMovieFromId,updateMovie} from '../controllers/movie.controller';

const router = Router();

// [GET] 🌐 /api/movies
router.get('/', getMovieAPI)

//[GET] 🌐 /api/movies/db
router.get('/db',getAllMoviesDB)

//[GET] 🌐 /api/movies/db/:id
router.get('/db/:id', getMovieFromId)

//[POST] 🌐 /api/movies/db
router.post('/db',createMovie)

//[PUT] 🌐 /api/movies/db/:id
router.put('/db/:id',updateMovie)

//[DELETE] 🌐 /api/movies/db/:id
router.delete('/db/:id', deleteMovieFromId)

export default router;