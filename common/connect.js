var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

connection.connect(function (err) {
  console.log(err);
  if (err) console.error("ket noi k thanh cong");
});

module.exports = connection;
