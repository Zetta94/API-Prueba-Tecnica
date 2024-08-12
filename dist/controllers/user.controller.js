"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shearchFavourites = exports.removeFavouriteMovie = exports.addFavouriteMovie = void 0;
const user_services_1 = __importDefault(require("../services/user.services"));
const service = new user_services_1.default();
const addFavouriteMovie = async (req, res) => {
    try {
        const { uid, mid } = req.params;
        const updatedUser = await service.addFavouriteMovie(uid, mid);
        res.status(200).json({ message: 'Movie added to favourites', payload: updatedUser });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add movie to favourites' });
    }
};
exports.addFavouriteMovie = addFavouriteMovie;
const removeFavouriteMovie = async (req, res) => {
    try {
        const { uid, mid } = req.params;
        const updatedUser = await service.removeFavouriteMovie(uid, mid);
        res.status(200).json({ message: 'Movie removed from favourites', payload: updatedUser });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to remove movie from favourites' });
    }
};
exports.removeFavouriteMovie = removeFavouriteMovie;
const shearchFavourites = async (req, res) => {
    try {
        const { uid } = req.params;
        const favouritesMovies = await service.getFavourites(uid);
        res.status(200).json({ message: 'Favourites Movies', payload: favouritesMovies });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to find movies from favourites' });
    }
};
exports.shearchFavourites = shearchFavourites;
