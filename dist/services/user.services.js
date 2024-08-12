"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_dao_1 = __importDefault(require("../dao/classes/user.dao"));
const manager = new user_dao_1.default();
class UserService {
    async addFavouriteMovie(uid, mid) {
        try {
            return await manager.addFavourite(uid, mid);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async removeFavouriteMovie(uid, mid) {
        try {
            return await manager.deleteFavourite(uid, mid);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
    async getFavourites(uid) {
        try {
            return await manager.getAllFavourites(uid);
        }
        catch (error) {
            throw new Error('Database query failed');
        }
    }
}
exports.default = UserService;
