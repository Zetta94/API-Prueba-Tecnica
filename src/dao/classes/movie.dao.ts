import movieModel from '../models/movie.model'

class MovieManager {
    async saveAllMovies(movies: any[]) {
        try {
        const result = await movieModel.insertMany(movies, { ordered: false })
        return result
        } catch (error) {
        console.error('Error saving movies:', error)
        throw new Error('Error saving movies')
        }
    }

    async findAll() {
        try {
            return await movieModel.find()
        } catch (error) {
            throw new Error('Database query failed')
        }
    }
    

    async searchById(id : string){
        try {
            return await movieModel.findById(id)
        } catch (error) {
            throw new Error('Database query failed')
        }
    }

    async createMovie (movieData: any){
        try {
            return await movieModel.create(movieData)
        } catch (error) {
            throw new Error('Database query failed')
        }
    }

    async deleteMovie (id : string){
        try {
            return await movieModel.deleteOne({_id : id})
        } catch (error) {
            throw new Error('Database query failed')
        }

    }

    async updateProperty (id: string, propertyName: string, newValue: any) {
        try {
          return await movieModel.findByIdAndUpdate(
            { _id: id },
            { [propertyName]: newValue },
            { new: true } 
          )
        } catch (error) {
          throw new Error('Database query failed')
        }
    }
    
}

export default MovieManager