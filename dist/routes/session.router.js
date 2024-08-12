"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
//[POST] 🌐 /register
router.post('/register', passport_1.default.authenticate('register', { session: true }), (req, res) => {
    res.status(201).json({ message: 'User registered successfully', user: req.user });
});
//[POST] 🌐 /login
router.post('/login', passport_1.default.authenticate('login', { session: true }), (req, res) => {
    res.status(200).json({ message: 'Login successful', user: req.user });
});
//[POST] 🌐 /logout
router.post('/logout', auth_1.isAuthenticated, (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.status(200).json({ message: 'Successfully logged out' });
    });
});
//[GET] 🌐 /current
router.get('/current', auth_1.isAuthenticated, (req, res) => {
    const user = req.user;
    if (user) {
        const userCurrent = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            favourite_movies: user.favourite_movies
        };
        res.json(userCurrent);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
});
exports.default = router;
