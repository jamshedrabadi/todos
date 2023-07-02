const passportConfig = require('../config/passport/passport.js');
const userRoutes = require('./user.routes.js');

exports.importRoutes = (app) => {
    // Health Check
    app.get('/health', (req, res) => {
        res.sendStatus(200);
    });

    // Routes
    app.use('/', userRoutes);

    // Wildcard to handle unregisted routes (keep this at the end of the function)
    app.use('*', passportConfig.isAuthenticated, (req, res) => {
        res.render('errors/404.ejs', {
            errorMessage: 'Page Not Found',
        });
    });
};
