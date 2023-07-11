/**
 * Table used to store Users
 * @param {object} Sequelize - sequelize
 * @param {object} DataTypes - data types
 * @returns {object} - model
 */
const Users = (Sequelize, DataTypes) => {
    return Sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM(Object.values(['active', 'inactive'])),
            defaultValue: 'active',
            allowNull: false,
        },
    }, {
        tableName: 'users',
    });
};

module.exports = Users;
