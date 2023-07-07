const db = require('../../config/database/db-config.js');

exports.getAllTodos = async () => {
    try {
        return await db.models.todos.findAll();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching list of todos from DB', error);
        throw error;
    }
};
