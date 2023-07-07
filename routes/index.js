const errorConstants = require('../constants/errors.js');
const passportConfig = require('../config/passport/passport.js');
const todoRoutes = require('../packages/todos/todo.routes.js');
const userRoutes = require('../packages/users/user.routes.js');

exports.importRoutes = (app) => {
    // Health Check
    app.get('/health', (req, res) => {
        return res.sendStatus(200);
    });

    // Routes
    app.use('/', userRoutes);
    app.use('/todos', todoRoutes);

    // Wildcard to handle unregisted routes (keep this at the end of the function)
    app.use('*', passportConfig.isAuthenticated, (req, res) => {
        return res.render('errors/404.ejs', { errorMessage: errorConstants.PAGE_NOT_FOUND });
    });
};
