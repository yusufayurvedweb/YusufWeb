const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'AbhiAndSanjeevani',
  password: 'abhiandsanjeevani',
  database: 'ecomfash'
});

module.exports = pool.promise();
