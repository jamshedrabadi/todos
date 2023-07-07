/**
 * Table used to store Todos
 * @param {object} Sequelize - sequelize
 * @param {object} DataTypes - data types
 * @returns {object} - model
 */
const Todos = (Sequelize, DataTypes) => {
    return Sequelize.define('todos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        comments: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.ENUM(Object.values(['public', 'private'])),
            defaultValue: 'public',
        },
    }, {
        tableName: 'todos',
    });
};

module.exports = Todos;
