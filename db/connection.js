const mysql = require('mysql2');
require('dotenv').config()
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: process.env.DB_PASSWORD,
    database:'employees'
})
connection.connect(function(error){
    if(error)throw error;
})
module.exports = connection