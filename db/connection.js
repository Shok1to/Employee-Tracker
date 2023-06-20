const mysql = require('mysql2');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Shokito911!',
    database:'employees'
})
connection.connect(function(error){
    if(error)throw error;
})
module.exports = connection