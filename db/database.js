const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'mysql-22404967-yusufayurvedwebsite.j.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_UJXfbFkb9e7s50oTzkl',
  database: ''
});

module.exports = pool.promise();
