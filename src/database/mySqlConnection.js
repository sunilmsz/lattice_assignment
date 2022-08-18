const mySql = require('mysql2')
const dotEnv = require('dotenv')

dotEnv.config({ path: "./config.env" })

var connection = mySql.createConnection({
    host: process.env.mySqlHost,
    user: process.env.mySqlUser,
    password: process.env.mySqlPassword,
    database: process.env.mySqlDatabase
});




module.exports = connection;