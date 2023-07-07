const errorConstants = require('../../constants/errors.js');
const todoService = require('./todo.service.js');

// ---------- Views ----------

exports.loadTodoLandingPage = (req, res) => {
    return res.redirect('/todos/list');
};

exports.loadTodoListPage = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();
        return res.render('todos/list.ejs', {
            loggedInUserData: req.user,
            todos,
        });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching list of todos', error);
        return res.render('errors/500', { errorMessage: errorConstants.TODO.ERROR_FETCHING_TODOS_LIST });
    }
};

// ---------- APIs ----------
