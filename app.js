const constants = require('./constants/index.js');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport.js');
const path = require('path');
const session = require('express-session');

// Load Config
dotenv.config();

// Passport Config
passportConfig.initPassportConfig();

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
const routes = require('./routes/index.js');
routes.importRoutes(app);

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server running on ${process.env.NODE_ENV} environment on port ${port}`));
