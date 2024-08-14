import express, { Application } from 'express'
import './configs/db.config'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import movieRouter from './routes/movie.router'
import sessionRouter from './routes/session.router'
import userRouter from './routes/user.router'
import setupSwagger from './configs/swagger.config'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import passport, { initialize } from 'passport'
import initializePassport from './configs/passport.config'
import './configs/passport.config'
import cors from 'cors'

dotenv.config()
const app: Application = express()
const PORT = process.env.PORT || 3001


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Configuracion de cors
const corsOptions = {
  origin: 'https://client-prueba-tecnica-579mfy2vj-manuels-projects-5a3093b2.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
}

app.use(cors(corsOptions))

// Configuración de Swagger
setupSwagger(app) 

//Configuracion de session
app.use(session({
  secret: process.env.SECRET_KEY || '',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  cookie: { secure: false, httpOnly: false }
}))

//Inicializacion de Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Rutas
app.use('/api/movies',movieRouter)
app.use('/',sessionRouter)
app.use('/api/users',userRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app