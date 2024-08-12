"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotAuthenticated = exports.isAuthenticated = void 0;
// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(401).json({ error: "Unauthorized: Please log in." });
    }
};
exports.isAuthenticated = isAuthenticated;
// Middleware para verificar si el usuario no está autenticado
const isNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    else {
        res.status(403).json({ error: "Forbidden: You are already logged in." });
    }
};
exports.isNotAuthenticated = isNotAuthenticated;
