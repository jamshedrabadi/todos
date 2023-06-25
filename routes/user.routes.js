const express = require('express');
const passportConfig = require('../config/passport.js');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

// ---------- Views ----------

router.get('/', passportConfig.isAuthenticated, userController.loadLandingPage);
router.get('/dashboard', passportConfig.isAuthenticated, userController.loadDashboardPage);
router.get('/login', userController.loadLoginPage);

// ---------- APIs ----------

router.post('/login', userController.authenticateUser);
router.get('/logout', userController.logoutUser);

module.exports = router;
