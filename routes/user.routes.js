const express = require('express');
const passportConfig = require('../config/passport.js');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

// ---------- Views ----------

router.get('/', passportConfig.isAuthenticated, userController.loadLandingPage);
router.get('/dashboard', passportConfig.isAuthenticated, userController.loadDashboardPage);
router.get('/login', userController.loadLoginPage);
router.get('/logout', userController.loadLogoutPage);

// ---------- APIs ----------

router.post('/login', userController.authenticateUser);

module.exports = router;
