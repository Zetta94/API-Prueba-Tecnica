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
router.get('/current', passport_1.default.authenticate('session'), (req, res) => {
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
    else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});
exports.default = router;
