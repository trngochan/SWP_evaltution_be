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

module.exports = Subject;