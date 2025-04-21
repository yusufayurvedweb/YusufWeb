const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql-22404967-yusufayurvedwebsite.j.aivencloud.com',
  user: 'AbhiAndSanjeevani',
  password: 'abhiandsanjeevani',
  database: 'ecomfash'
});

module.exports = pool.promise();
