"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiData_1 = __importDefault(require("../utils/apiData"));
const movie_dao_1 = __importDefault(require("../dao/classes/movie.dao"));
const manager = new movie_dao_1.default();
class MovieService {
    //Servicios para API
    async getMoviesFromAPI(page = 1) {
        const response = await apiData_1.default.get('/movie/popular', {
            params: { page },
        });
        return response.data.results;
    }
    async searchMoviesByTitle(title) {
        const response = await apiData_1.default.get('/search/movie', {
            params: { query: title },
        });
        return response.data.results;
    }
    //Servicios para Base de datos
    async getAllMoviesDB() {
        try {
            return await manager.findAll();
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async getMovieFromIdDB(id) {
        try {
            return await manager.searchById(id);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async createMovieToDB(movieData) {
        try {
            return await manager.createMovie(movieData);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async deleteMovieFromDB(id) {
        try {
            return await manager.deleteMovie(id);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async updateMovieProperty(id, propertyName, newValue) {
        try {
            return await manager.updateProperty(id, propertyName, newValue);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
}
exports.default = MovieService;
