var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "swpeva1",
});

connection.connect(function (err) {
  if (err) console.error("ket noi k thanh cong");
});

module.exports = connection;
