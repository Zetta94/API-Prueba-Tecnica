import { Router } from 'express';
import {addFavouriteMovie,removeFavouriteMovie,shearchFavourites} from '../controllers/user.controller'
import { isAuthenticated } from '../middlewares/auth';

const router = Router()

//[GET] 🌐 /:uid/favourite/:mid
router.get('/:uid/favourite', shearchFavourites)

// [PUT] 🌐 /:uid/favourite/:mid
router.put('/:uid/favourite/:mid', addFavouriteMovie)

// [PUT] 🌐 /:uid/favourite/:mid
router.delete('/:uid/favourite/:mid', removeFavouriteMovie)

export default router