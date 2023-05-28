const db = require("../common/connect");

const Teacher = function (teacher) {
  this.username = teacher.username;
  this.password = teacher.password;
  this.role = teacher.role;
};

Teacher.login = function (data, result) {
  const param = [data.username, data.password];
  try {
    db.query(
      "SELECT username, role, id from lecture where username = ? && password = ?",
      param,
      function (err, data) {
        if (err) {
          result(err);
        } else {
          result(data);
        }
      }
    );
  } catch (error) {
    console.log("co lou");
  }
};

Teacher.getAll = function(cb) { 
    db.query("SELECT name, birthday, phonenumber, address FROM lecture", function (err, data) {
        if (err) {
            cb(err)
        } else {
            cb(data)
        }
    });
}

// Teacher.getByCommitId = function(cb) { 
//     db.query("SELECT name, birthday, phonenumber, address FROM lecture", function (err, data) {
//         if (err) {
//             cb(err)
//         } else {
//             cb(data)
//         }
//     });
// }

module.exports = Teacher;