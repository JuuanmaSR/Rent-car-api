/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    dialect: process.env.DIALECT,
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
  },
};
