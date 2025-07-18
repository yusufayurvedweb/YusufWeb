import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host : "mysql-23fa03bf-yusufayurvedwebsite.e.aivencloud.com",
    port : 11857,
    user : "avnadmin",
    password : "AVNS_Ps1p7s-5oKFvS04n6sk",
    database : "defaultdb"
});

export default pool;
