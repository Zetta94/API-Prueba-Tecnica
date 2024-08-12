import { Request, Response, NextFunction } from 'express'

// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next() 
    } else {
        res.status(401).json({ error: "Unauthorized: Please log in." }) 
    }
}

// Middleware para verificar si el usuario no está autenticado
export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
        return next() 
    } else {
        res.status(403).json({ error: "Forbidden: You are already logged in." }) 
    }
}
