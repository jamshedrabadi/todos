import express from 'express';
import { isAuthenticated } from '../config/passport/passport.js';
import { loadLandingPage, loadDashboardPage, loadLoginPage, authenticateUser, logoutUser } from '../controllers/user.controller.js';

const router = express.Router();

// ---------- Views ----------

router.get('/', isAuthenticated, loadLandingPage);
router.get('/dashboard', isAuthenticated, loadDashboardPage);
router.get('/login', loadLoginPage);

// ---------- APIs ----------

router.post('/login', authenticateUser);
router.get('/logout', logoutUser);

export default router;
