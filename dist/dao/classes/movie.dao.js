"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const movie_model_1 = __importDefault(require("../models/movie.model"));
class MovieManager {
    async saveAllMovies(movies) {
        try {
            const result = await movie_model_1.default.insertMany(movies, { ordered: false });
            return result;
        }
        catch (error) {
            console.error('Error saving movies:', error);
            throw new Error('Error saving movies');
        }
    }
    async findAll() {
        try {
            return await movie_model_1.default.find();
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async searchById(id) {
        try {
            return await movie_model_1.default.findById(id);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async createMovie(movieData) {
        try {
            return await movie_model_1.default.create(movieData);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async deleteMovie(id) {
        try {
            return await movie_model_1.default.deleteOne({ _id: id });
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async updateProperty(id, propertyName, newValue) {
        try {
            return await movie_model_1.default.findByIdAndUpdate({ _id: id }, { [propertyName]: newValue }, { new: true });
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
}
exports.default = MovieManager;
