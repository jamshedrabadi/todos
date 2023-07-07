const express = require('express');
const passportConfig = require('../../config/passport/passport.js');
const todoController = require('./todo.controller.js');

const router = express.Router();

// ---------- Views ----------

router.get('/', passportConfig.isAuthenticated, todoController.loadTodoLandingPage);
router.get('/list', passportConfig.isAuthenticated, todoController.loadTodoListPage);

// ---------- APIs ----------

module.exports = router;
