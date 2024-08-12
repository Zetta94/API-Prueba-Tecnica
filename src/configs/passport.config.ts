import passport from 'passport'
import local from 'passport-local'
import userModel from '../dao/models/user.model' 
import { createHash, isValidPassword  } from '../utils/cryptoUtils'


const LocalStrategy = local.Strategy

const initializePassport = () => {

    // Estrategia de registro
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            const { first_name, last_name, email } = req.body
            try {
                let user = await userModel.findOne({ email: username })
                if (user) {
                    console.log("User exists")
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    favourite_movies: [],
                }
                let result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done(error)
            }
        }
    ))

    
    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username })

                if (!user) {
                    console.log("User not exists")
                    return done(null, false)
                }

                if (!isValidPassword(user.password, password)) {
                    console.log("Password is not ok")
                    return done(null, false)
                }

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))


    passport.serializeUser((user: any, done: Function) => {
    done(null, user.id)
    })


    passport.deserializeUser(async (id: string, done: Function) => {
    try {
        const user = await userModel.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
    })

}

export default  initializePassport

