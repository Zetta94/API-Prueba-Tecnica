import {Router} from 'express'
import passport from 'passport'
import { Request, Response} from 'express'
import { isAuthenticated } from '../middlewares/auth'
import { IUser } from '../dao/models/user.model'

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
        res.status(200).json({ message: 'Login successful', user: req.user , cookie : req.sessionID})
    }
)
  
//[POST] 🌐 /logout
router.post('/logout', isAuthenticated, (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out' });
        }
        res.status(200).json({ message: 'Successfully logged out' });
    });
});


//[GET] 🌐 /current
router.get('/current', isAuthenticated, (req, res) => {
    const user = req.user as IUser;

    if (user) {
        const userCurrent = {
            first_name: user.first_name, 
            last_name: user.last_name,
            email: user.email,
            favourite_movies: user.favourite_movies
        };
        res.json(userCurrent);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});



export default router