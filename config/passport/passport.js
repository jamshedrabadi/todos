const errorConstants = require('../../constants/errors.js');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const userService = require('../../packages/users/user.service.js');

exports.initPassportConfig = () => {
    try {
        passport.use(new LocalStrategy(async (email, password, done) => {
            const user = await userService.authenticateUser(email, password);
            if (!user) {
                return done(null, false, { errorMessage: errorConstants.USER.INVALID_USERNAME_PASSWORD });
            }
            if (user.status === 'inactive') {
                return done(null, false, { errorMessage: errorConstants.USER.USER_DISABLED });
            }
            return done(null, {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            });
        }));

        passport.serializeUser((user, done) => {
            done(null, user);
        });

        passport.deserializeUser((user, done) => {
            done(null, user);
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error looking for user in DB', error);
        throw error;
    }
};

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');
};
