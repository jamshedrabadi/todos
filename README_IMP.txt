npm i express dotenv ejs morgan passport passport-local express-session sequelize sequelize-cli mysql2

(sequelize version > 6 breaks import support (ES6 syntax). Downgrade to version 5.22.3)

npm i -D nodemon jsdoc cross-env

npm i -D eslint eslint-config-semistandard eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-sort eslint-plugin-sort-requires eslint-plugin-standard eslint-plugin-jsdoc

-----

1. get data from db (static now)
2. dynamic models in db config
3. use .sequelizerc file for migration and seed instead of --config in package
4. validator/joi validataions

-----
