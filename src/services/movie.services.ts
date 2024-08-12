import apiData from '../utils/apiData'
import MovieManager from '../dao/classes/movie.dao'

const manager = new MovieManager()

class MovieService {
    //Servicios para API

    async getMoviesFromAPI(page: number = 1) {
        const response = await apiData.get('/movie/popular', {
        params: { page },
        })
        return response.data.results
    }

    //Servicios para Base de datos

    async getAllMoviesDB() {
        try {
            return await manager.findAll()
        } catch (error) {
            throw new Error('Database query failed')
        }
    }
    

    async getMovieFromIdDB(id: string) {
        try {
            return await manager.searchById(id)
        } catch (error) {
            throw new Error('Database query failed')
        }
    }

    async createMovieToDB(movieData: any) {
        try {
            return await manager.createMovie(movieData)
        } catch (error) {
            throw new Error('Database query failed')
        }
    }

    async deleteMovieFromDB (id: string){
        try {
            return await manager.deleteMovie(id)
        } catch (error) {
            throw new Error('Database query failed')
        }
    }

    async updateMovieProperty (id: string, propertyName: string, newValue: any){
        try {
            return await manager.updateProperty(id, propertyName, newValue);
          } catch (error) {
            throw new Error('Database query failed');
          }
    }
}

export default MovieService
