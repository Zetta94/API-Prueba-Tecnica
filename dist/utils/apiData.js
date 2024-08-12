"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const movie_config_1 = require("../configs/movie.config");
const apiData = axios_1.default.create({
    baseURL: movie_config_1.API_URL,
    params: {
        api_key: movie_config_1.API_KEY,
    },
});
exports.default = apiData;
