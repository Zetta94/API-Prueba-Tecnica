import userModel from "../models/user.model"


//Falto controlar si la pelicula ya estaba agregada como favorito o no.
class UserManager {
    async addFavourite(uid:string,mid:string){
        try {
            return await userModel.findByIdAndUpdate(
                { _id: uid },
                { $addToSet: { favourite_movies: mid } },
                { new: true } 
                ).populate('favourite_movies')
          } catch (error) {
            throw new Error('Database query failed')
          }
    }

    async deleteFavourite(uid:string,mid:string){
        try {
            return await userModel.findByIdAndUpdate(
                { _id: uid },
                { $pull: { favourite_movies: mid } },
                { new: true } 
                ).populate('favourite_movies')
          } catch (error) {
            throw new Error('Database query failed')
          }
    }

    async getAllFavourites(uid: string) {
      try {
          const user = await userModel.findById(uid).populate('favourite_movies')
          if (!user) {
              throw new Error('User not found')
          }
          return user.favourite_movies
      } catch (error) {
          throw new Error('Database query failed')
      }
  }
}

export default UserManager