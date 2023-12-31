const express = require('express');
const passportConfig = require('../../config/passport/passport.js');
const userController = require('./user.controller.js');

const router = express.Router();

// ---------- Views ----------

router.get('/', passportConfig.isAuthenticated, userController.loadLandingPage);
router.get('/dashboard', passportConfig.isAuthenticated, userController.loadDashboardPage);
router.get('/login', userController.loadLoginPage);

// ---------- APIs ----------

router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

module.exports = router;
