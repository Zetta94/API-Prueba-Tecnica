import dotenv from 'dotenv'
dotenv.config()

export const API_URL = 'https://api.themoviedb.org/3'
export const API_KEY = process.env.API_KEY || ''
