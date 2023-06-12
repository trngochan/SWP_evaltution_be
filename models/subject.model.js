const db = require("../common/connect");

const Subject = function (subject) {
  this.id = subject.id;
  this.name = subject.name;
  this.description = subject.description;
};

Subject.getAll = function (cb) {
  db.query(`SELECT * from subject`, function (err, result) {
    if (err) {
      cb(err);
      return;
    }
    cb(result);
  });
};

Subject.add = function (data, cb) {
  try {
    db.query(
      "INSERT INTO `subject`( `Name`, `Description`) VALUES (?, ?)",
      [data.name, data.description],
      function (err, results) {
        if (err) {
          console.log(err);
        }
        return cb({
          status: 200,
          message: "Inserted successfully",
        });
      }
    );
  } catch (error) {
    return cb({
      status: 401,
      message: "Error at insert subject",
    });
  }
};

module.exports = Subject;
