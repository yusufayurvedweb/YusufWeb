import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'mysql-22404967-yusufayurvedwebsite.j.aivencloud.com',
  port : 11857,
  user: 'avnadmin',
  password: 'AVNS_UJXfbFkb9e7s50oTzkl',
  database: 'defaultdb'
});

export default pool;
