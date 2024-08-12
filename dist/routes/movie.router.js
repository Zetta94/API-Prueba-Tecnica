"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movie_controller_1 = require("../controllers/movie.controller");
const router = (0, express_1.Router)();
// [GET] 🌐 /api/movies
router.get('/', movie_controller_1.getMovieAPI);
// [GET] 🌐 /api/movies/search
router.get('/search', movie_controller_1.searchMovieByTitle);
//[GET] 🌐 /api/movies/db
router.get('/db', movie_controller_1.getAllMoviesDB);
//[GET] 🌐 /api/movies/db/:id
router.get('/db/:id', movie_controller_1.getMovieFromId);
//[POST] 🌐 /api/movies/db
router.post('/db', movie_controller_1.createMovie);
//[PUT] 🌐 /api/movies/db/:id
router.put('/db/:id', movie_controller_1.updateMovie);
//[DELETE] 🌐 /api/movies/db/:id
router.delete('/db/:id', movie_controller_1.deleteMovieFromId);
exports.default = router;
