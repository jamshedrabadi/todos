const constants = require('./constants/index.js');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const passportConfig = require('./config/passport.js');
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

// ---------- Testing routes ----------

app.get('/', passportConfig.isAuthenticated, (req, res) => {
    res.render('home.ejs', { loggedInUserData: req.user });
});

app.get('/login', (req, res) => {
    if (req.user) {
        return res.redirect('/');
    }
    res.render('login.ejs');
});

app.post('/login', (req, res, next) => {
    /*
     * const validationErrors = [];
     * if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
     * if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });
     */

    /*
     * if (validationErrors.length) {
     * req.flash('errors', validationErrors);
     * return res.redirect('/login');
     * }
     * req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
     */

    passport.authenticate('local', (err, user) => {
        if (err) { return next(err); }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            // req.session.save(() => res.redirect('/')); // failsafe option
            return res.redirect('/');
        });
    })(req, res, next);
});

app.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) { return next(error); }
        req.session.destroy((err) => {
            if (err) { return next(err); }
            req.user = null;
            res.redirect('/');
        });
    });
});

// --------------------------------------------------

// eslint-disable-next-line no-console
app.listen(port, console.log(`Server running on ${process.env.NODE_ENV} environment on port ${port}`));
