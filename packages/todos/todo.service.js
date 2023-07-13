const db = require('../../config/database/db-config.js');

exports.getAllUserTodos = async (userId) => {
    try {
        return await db.models.todos.findAll({ where: { userId } });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Error fetching list of todos from DB', error);
        throw error;
    }
};
