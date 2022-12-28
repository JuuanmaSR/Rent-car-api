export default () => ({
  database: {
    dialect: process.env.DIALECT,
    name: process.env.MYSQLDATABASE,
    host: process.env.MYSQLHOST,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
  },
  authentication: {
    secretKey: process.env.SECRET_KEY,
  },
});
