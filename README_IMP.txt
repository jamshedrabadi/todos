npm i express dotenv ejs morgan passport passport-local express-session sequelize sequelize-cli mysql2

(sequelize version > 6 breaks import support (ES6 syntax). Downgrade to version 5.22.3)

npm i -D nodemon jsdoc

npm i -D eslint eslint-config-semistandard eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-sort eslint-plugin-sort-requires eslint-plugin-standard eslint-plugin-jsdoc

-----

timestamps: false

- set this in model.js file, define() options
- this will prevent automatic creation of createdAt and updatedAt columns in table
- these columns are maintained automatically
- default is true
- you can set timestamps as true and createdAt/updatedAt as false as per preference
- you can also rename columns by setting createdAt/updatedAt as the value of custom column name

-----

- get user data from db (static now)
- show only user specific data
- comments as array
- check validations during insert/update
- check user validations during user specific data insert/update
- use .sequelizerc file for migration and seed instead of --config in package
- validator/joi validataions
