import userManager from '../dao/classes/user.dao'

const manager = new userManager()

class UserService {
    async addFavouriteMovie(uid: string, mid: string) {
        try {
            return await manager.addFavourite(uid,mid)
        } catch (error) {
            throw new Error('Database query failed')
        }
    }
    
    async removeFavouriteMovie(uid: string, mid: string) {
        try {
            return await manager.deleteFavourite(uid,mid)
        } catch (error) {
            throw new Error('Database query failed')
        }
    }
}

export default UserService