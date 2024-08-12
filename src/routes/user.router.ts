import { Router } from 'express';
import {addFavouriteMovie,removeFavouriteMovie} from '../controllers/user.controller'
import { isAuthenticated } from '../middlewares/auth';

const router = Router()

// [PUT] 🌐 /:uid/favourite/:mid
router.put('/:uid/favourite/:mid', addFavouriteMovie)

// [put] 🌐 /:uid/favourite/:mid
router.put('/:uid/favourite/:mid', removeFavouriteMovie)

export default router