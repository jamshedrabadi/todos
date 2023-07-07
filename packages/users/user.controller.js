const passport = require('passport');

// ---------- Views ----------

exports.loadLandingPage = (req, res) => {
    return res.redirect('/dashboard');
};

exports.loadDashboardPage = (req, res) => {
    return res.render('dashboard.ejs', {
        loggedInUserData: req.user,
    });
};

exports.loadLoginPage = (req, res) => {
    if (req.user) {
        return res.redirect('/dashboard');
    }
    return res.render('login.ejs');
};

// ---------- APIs ----------

exports.authenticateUser = (req, res, next) => {
    /*
     * const validationErrors = [];
     * if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
     * if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });
     *
     * if (validationErrors.length) {
     * req.flash('errors', validationErrors);
     * return res.redirect('/login');
     * }
     * req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
     */

    passport.authenticate('local', (userAuthError, user) => {
        if (userAuthError) {
            return next(userAuthError);
        }
        if (!user) {
            return res.redirect('/login');
        }
        req.logIn(user, (userLoginError) => {
            if (userLoginError) {
                return next(userLoginError);
            }
            return res.redirect('/dashboard');
            // req.session.save(() => res.redirect('/dashboard')); // failsafe option
        });
    })(req, res, next);
};

exports.logoutUser = (req, res, next) => {
    req.logout((logoutError) => {
        if (logoutError) {
            return next(logoutError);
        }
        req.session.destroy((sessionLogoutError) => {
            if (sessionLogoutError) {
                return next(sessionLogoutError);
            }
            req.user = null;
            return res.redirect('/login');
        });
    });
};
