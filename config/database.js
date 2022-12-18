// THIS FILE ALLOWS THE USAGE OF THE DATABASE
// CONFIGURATION FILE LOADED FROM THE '.env'
// FILE INTO './config/index.js'
const config = require("./index");

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

// 'production' DATABASE CONFIGURATION CONTAINS
// DIFFERENT KEYS VERSUS 'development' FOR DEPLOYMENT.
// DATABASE WILL BE READ FROM A URL PATH INSTEAD OF
// 'username', 'password', AND 'database' KEYS
module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: "postgres",
    seederStorage: "sequelize",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    seederStorage: "sequelize",
  },
};
