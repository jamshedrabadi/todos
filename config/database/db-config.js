const dotenv = require('dotenv');
const path = require('path');
const Sequelize = require('sequelize');

// Load Config
dotenv.config();

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'mysql',
        logging: false,
    });

const models = {
    todos: require(path.join(__dirname, '../../models/todos.model.js'))(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

module.exports = {
    sequelize,
    models,
};
