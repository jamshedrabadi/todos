import { Sequelize } from 'sequelize';

export default () => {
    return new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD, {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            dialect: 'mysql',
            logging: false,
        });
};
