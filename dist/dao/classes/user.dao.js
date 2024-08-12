"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
//Falto controlar si la pelicula ya estaba agregada como favorito o no.
class UserManager {
    async addFavourite(uid, mid) {
        try {
            return await user_model_1.default.findByIdAndUpdate({ _id: uid }, { $addToSet: { favourite_movies: mid } }, { new: true }).populate('favourite_movies');
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async deleteFavourite(uid, mid) {
        try {
            return await user_model_1.default.findByIdAndUpdate({ _id: uid }, { $pull: { favourite_movies: mid } }, { new: true }).populate('favourite_movies');
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async getAllFavourites(uid) {
        try {
            const user = await user_model_1.default.findById(uid).populate('favourite_movies');
            if (!user) {
                throw new Error('User not found');
            }
            return user.favourite_movies;
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
}
exports.default = UserManager;
