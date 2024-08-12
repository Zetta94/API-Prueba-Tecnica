"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPassword = exports.createHash = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.SECRET_KEY || '';
// Función para crear un hash 
const createHash = (password) => {
    return crypto_js_1.default.AES.encrypt(password, key).toString();
};
exports.createHash = createHash;
// Función para verificar si la contraseña
const isValidPassword = (encryptedPassword, password) => {
    try {
        const bytes = crypto_js_1.default.AES.decrypt(encryptedPassword, key);
        const originalPassword = bytes.toString(crypto_js_1.default.enc.Utf8);
        return originalPassword === password;
    }
    catch (error) {
        return false;
    }
};
exports.isValidPassword = isValidPassword;
