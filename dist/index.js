"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./configs/db.config");
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const movie_router_1 = __importDefault(require("./routes/movie.router"));
const session_router_1 = __importDefault(require("./routes/session.router"));
const user_router_1 = __importDefault(require("./routes/user.router"));
const swagger_config_1 = __importDefault(require("./configs/swagger.config"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = __importDefault(require("./configs/passport.config"));
require("./configs/passport.config");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
//Configuracion de cors
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
};
app.use((0, cors_1.default)(corsOptions));
// Configuración de Swagger
(0, swagger_config_1.default)(app);
//Configuracion de session
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_KEY || '',
    resave: false,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({ mongoUrl: process.env.MONGODB_URL }),
}));
//Inicializacion de Passport
(0, passport_config_1.default)();
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//Rutas
app.use('/api/movies', movie_router_1.default);
app.use('/', session_router_1.default);
app.use('/api/users', user_router_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
