import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  timezone: '+00:00', // UTC
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  multipleStatements: true
});

export default pool;
