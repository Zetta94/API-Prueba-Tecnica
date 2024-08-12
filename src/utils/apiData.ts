import axios from 'axios'
import { API_URL, API_KEY } from '../configs/movie.config'

const apiData = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
})

export default apiData
