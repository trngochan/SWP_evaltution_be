const db = require("../common/connect");

const Teacher = function (teacher) {
  this.username = teacher.username;
  this.password = teacher.password;
  this.role = teacher.role;
};

module.exports = Teacher;
