"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = exports.deleteMovieFromId = exports.createMovie = exports.getAllMoviesDB = exports.getMovieFromId = exports.searchMovieByTitle = exports.getMovieAPI = void 0;
const movie_services_1 = __importDefault(require("../services/movie.services"));
const service = new movie_services_1.default();
//Controladores para API
const getMovieAPI = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const movies = await service.getMoviesFromAPI(page);
        res.status(201).json({ message: "Success", payload: movies });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
};
exports.getMovieAPI = getMovieAPI;
const searchMovieByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        const movie = await service.searchMoviesByTitle(title);
        res.status(201).json({ message: "Success", payload: movie });
    }
    catch (error) {
        res.status(500).json({ error: 'Error buscando la película por título' });
    }
};
exports.searchMovieByTitle = searchMovieByTitle;
//Controladores para DB
const getMovieFromId = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await service.getMovieFromIdDB(id);
        if (movie) {
            res.status(201).json({ message: "Success", payload: movie });
        }
        else {
            res.status(404).json({ error: 'Movie not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch the movie' });
    }
};
exports.getMovieFromId = getMovieFromId;
const getAllMoviesDB = async (req, res) => {
    try {
        const movies = await service.getAllMoviesDB();
        if (movies) {
            res.status(201).json({ message: "Success", payload: movies });
        }
        else {
            res.status(404).json({ error: "Movies not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch the movie' });
    }
};
exports.getAllMoviesDB = getAllMoviesDB;
const createMovie = async (req, res) => {
    try {
        const query = req.body;
        console.log(req.body);
        const movie = await service.createMovieToDB(query);
        if (movie) {
            res.status(201).json({ message: "Success", payload: movie });
        }
        else {
            res.status(404).json({ error: "Movies not create" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create the movie" });
    }
};
exports.createMovie = createMovie;
const deleteMovieFromId = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await service.deleteMovieFromDB(id);
        if (movie) {
            res.status(201).json({ message: "Success", Status: "Movie deleted" });
        }
        else {
            res.status(404).json({ error: 'Movie not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch the movie' });
    }
};
exports.deleteMovieFromId = deleteMovieFromId;
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { propertyName, newValue } = req.body;
        if (!propertyName || newValue === undefined) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        const updatedMovie = await service.updateMovieProperty(id, propertyName, newValue);
        if (updatedMovie) {
            res.status(200).json({ message: 'Success', updatedProperty: { [propertyName]: newValue } });
        }
        else {
            res.status(404).json({ error: 'Movie not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update the movie' });
    }
};
exports.updateMovie = updateMovie;
