"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.MONGODB_URL || '');
const db = mongoose_1.default.connection;
db.on('error', () => {
    console.error('❌ Error in MongoDB connection');
});
db.once('open', () => {
    console.log('🆗 Connected to MongoDB');
});
exports.default = db;
