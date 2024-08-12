import {Router} from 'express'
import passport from 'passport'
import { Request, Response} from 'express'
import { isAuthenticated } from '../middlewares/auth'

const router = Router()
//[POST] 🌐 /register
router.post('/register', passport.authenticate('register', { session: true }), 
    (req:Request, res:Response) => {
      res.status(201).json({ message: 'User registered successfully', user: req.user })
    }
)

//[POST] 🌐 /login
router.post('/login', 
    passport.authenticate('login', { session: true }), 
    (req:Request, res:Response) => {
      res.status(200).json({ message: 'Login successful', user: req.user })
    }
)
  
//[POST] 🌐 /logout
router.post('/logout', isAuthenticated, (req:Request, res:Response) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' })
        }
        res.status(200).json({ message: 'Successfully logged out' })
    })
})

export default router