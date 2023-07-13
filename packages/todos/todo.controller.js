const errorConstants = require('../../constants/errors.js');
const moment = require('moment');
const todoService = require('./todo.service.js');

// ---------- Views ----------

exports.loadTodoLandingPage = (req, res) => {
    return res.redirect('/todos/list');
};

exports.loadTodoListPage = async (req, res) => {
    try {
        const todos = await todoService.getAllUserTodos(req.user.id);
        return res.render('todos/list.ejs', {
            loggedInUserData: req.user,
            moment,
            todos,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching list of todos', error);
        return res.render('errors/500.ejs', { errorMessage: errorConstants.TODO.ERROR_FETCHING_TODOS_LIST });
    }
};

exports.loadTodoAddPage = async (req, res) => {
    return res.render('todos/add.ejs', {
        loggedInUserData: req.user,
    });
};

// ---------- APIs ----------

exports.addTodo = async (req, res) => {
    console.log('---in-controller--- ', req.body);
};
