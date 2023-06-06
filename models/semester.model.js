const db = require("../common/connect");

const semester = function (semester) {
  this.id = semester.id;
  this.year = semester.year;
  this.session = semester.session;
  this.startTime = semester.startTime;
  this.endTime = semester.endTime;
};

semester.getAll = function (cb) {
  try {
    db.query("select * from Semester", function (err, results) {
      if (err) return cb(err);
      return cb(results);
    });
  } catch (error) {
    cb(error);
  }
};

semester.add = function (data ,cb) {
  try {
    db.query("insert into semester values (?, ?, ? ? ,?)",data, function (err, results) {
      if (err) return cb(err);
      return cb(results);
    });
  } catch (error) {
    cb(error);
  }
};

module.exports = semester; 
