import { Sequelize } from 'sequelize';

export default (dbName, dbUsername, dbPassword, dbHost, dbPort) => {
    return new Sequelize(dbName, dbUsername, dbPassword, {
        host: dbHost,
        port: dbPort,
        dialect: 'mysql',
        logging: false,
    });
};
