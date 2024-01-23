const mysql = require("mysql2/promise");
require("dotenv").config();
// Create the connection to database
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT, //nếu không truyền default 3306
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, //nếu không truyền default 3306
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, //chỉ 10 thằng kết nối được đến thôi
  queueLimit: 0,
});

module.exports = connection;
