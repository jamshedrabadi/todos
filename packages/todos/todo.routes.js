const express = require('express');
const passportConfig = require('../../config/passport/passport.js');
const todoController = require('./todo.controller.js');

const router = express.Router();

const multer = require('multer');
const upload = multer();

// ---------- Views ----------

router.get('/', passportConfig.isAuthenticated, todoController.loadTodoLandingPage);
router.get('/list', passportConfig.isAuthenticated, todoController.loadTodoListPage);
router.get('/add', passportConfig.isAuthenticated, todoController.loadTodoAddPage);

// ---------- APIs ----------

router.post('/addTodo', [passportConfig.isAuthenticated, upload.any()], todoController.addTodo);

module.exports = router;
