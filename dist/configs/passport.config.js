"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_model_1 = __importDefault(require("../dao/models/user.model"));
const cryptoUtils_1 = require("../utils/cryptoUtils");
const LocalStrategy = passport_local_1.default.Strategy;
const initializePassport = () => {
    // Estrategia de registro
    passport_1.default.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
        const { first_name, last_name, email } = req.body;
        try {
            let user = await user_model_1.default.findOne({ email: username });
            if (user) {
                console.log("User exists");
                return done(null, false);
            }
            const newUser = {
                first_name,
                last_name,
                email,
                password: (0, cryptoUtils_1.createHash)(password),
                favourite_movies: [],
            };
            let result = await user_model_1.default.create(newUser);
            return done(null, result);
        }
        catch (error) {
            return done(error);
        }
    }));
    passport_1.default.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        try {
            const user = await user_model_1.default.findOne({ email: username });
            if (!user) {
                console.log("User not exists");
                return done(null, false);
            }
            if (!(0, cryptoUtils_1.isValidPassword)(user.password, password)) {
                console.log("Password is not ok");
                return done(null, false);
            }
            return done(null, user);
        }
        catch (error) {
            return done(error);
        }
    }));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser(async (id, done) => {
        try {
            const user = await user_model_1.default.findById(id);
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    });
};
exports.default = initializePassport;
