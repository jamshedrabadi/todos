/**
 * Table used to store Todos
 * @param {object} Sequelize - sequelize
 * @param {object} DataTypes - data types
 * @returns {object} - model
 */
const Todos = (Sequelize, DataTypes) => {
    return Sequelize.define('todos', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
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
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM(Object.values(['public', 'private'])),
            defaultValue: 'public',
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        tableName: 'todos',
    });
};

module.exports = Todos;
