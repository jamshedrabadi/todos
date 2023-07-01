import userRoutes from './user.routes.js';
import { isAuthenticated } from '../config/passport/passport.js';

export const importRoutes = (app) => {
    // Health Check
    app.get('/health', (req, res) => {
        res.sendStatus(200);
    });

    // Routes
    app.use('/', userRoutes);

    // Wildcard to handle unregisted routes (keep this at the end of the function)
    app.use('*', isAuthenticated, (req, res) => {
        res.render('errors/404.ejs', {
            errorMessage: 'Page Not Found',
        });
    });
};
