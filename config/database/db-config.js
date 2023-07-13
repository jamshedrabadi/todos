const dotenv = require('dotenv');
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
        define: {
            freezeTableName: false, // prevent pluralizing table names
        },
        query: {
            raw: true, // sends datavalues directly as resultset (bypasses custom getters and setters)
        },
    });

/*
 * Below code automatically fetches and syncs models in alphabetical order, with the possibility of foreign key constraints
 * failing if a referencing table is created before the table it reference (SQL Error: failed to open the referenced table)
 *
 * const modelPath = path.join(__dirname, '../../models');
 * const models = {};
 *
 * fs.readdirSync(modelPath).filter(file => (
 *     file.slice(-3) === '.js' && // include js files only
 *     file.indexOf('.') !== 0 && // exclude files starting with '.'
 *     file.indexOf('.test.js') === -1 // exlude test files
 * )).forEach(file => {
 *     const model = require(path.join(modelPath, file))(sequelize, Sequelize.DataTypes);
 *     models[model.name] = model;
 * });
 */

const models = {
    users: require('../../models/users.model.js')(sequelize, Sequelize.DataTypes),
    todos: require('../../models/todos.model.js')(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach(model => {
    if (models[model].associate) {
        models[model].associate(models);
    }
});

const connect = async () => {
    try {
        await sequelize.sync();
        // eslint-disable-next-line no-console
        console.log('Connected to the database');
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Failed to connect the database', error);
    }
};

module.exports = {
    Sequelize,
    sequelize,
    models,
    connect,
};
