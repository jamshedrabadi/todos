import constants from './constants/index.js';
import dbConfig from './config/db-config.js';
import { config } from 'dotenv'
import express from 'express';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import session from "express-session";
import { initPassportConfig } from './config/passport.js';
import { importRoutes } from './routes/index.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Config
config();

// Passport Config
initPassportConfig();

// Load DB
const dbConnection = dbConfig(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,
    process.env.DATABASE_HOST, process.env.DATABASE_PORT);

// Init Express and Port
const app = express();
const port = process.env.PORT || 3000;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger
if (process.env.NODE_ENV === constants.ENV.DEVELOPMENT) {
    app.use(morgan('dev'));
}

// Set EJS as Templating Engine
app.set('view engine', 'ejs');

// Session Config
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { secure: (process.env.COOKIE_SECURE === 'true'), maxAge: parseInt(process.env.COOKIE_MAXAGE) },
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
importRoutes(app);

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server running on ${process.env.NODE_ENV} environment on port ${port}`));

// Establish DB Connection
try {
    await dbConnection.sync();
    // eslint-disable-next-line no-console
    console.log('Connected to the database');
} catch (error) {
    // eslint-disable-next-line no-console
    console.log('Failed to connect the database', error);
}

// export example = () => {}

// exports.example = function example() { };

// export function example() { }
