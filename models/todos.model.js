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
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM(Object.values(['active', 'inactive'])),
            defaultValue: 'active',
            allowNull: false,
        },
    }, {
        tableName: 'todos',
    });
};

module.exports = Todos;
