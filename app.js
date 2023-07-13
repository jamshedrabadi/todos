const constants = require('./constants/index.js');
const dbConfig = require('./config/database/db-config.js');
const dotenv = require('dotenv');
const express = require('express');
const flash = require('express-flash');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport/passport.js');
const path = require('path');
const routes = require('./routes/index.js');
const session = require('express-session');

// Load Config
dotenv.config();

// Passport Config
passportConfig.initPassportConfig();

// Init Express and Port
const app = express();
const port = process.env.PORT || 3001;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Initialize express flash for messaages
app.use(flash());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
routes.importRoutes(app);

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server running on ${process.env.NODE_ENV} environment on port ${port}`));

// Establish DB Connection
dbConfig.connect();
