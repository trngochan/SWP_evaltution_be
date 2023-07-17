var mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "test",
});

connection.connect(function (err) {
  if (err) console.error("ket noi k thanh cong");
});

module.exports = connection;
