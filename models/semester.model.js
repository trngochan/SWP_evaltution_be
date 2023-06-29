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
    db.query(
      "select * from Semester where Status = 1",
      function (err, results) {
        if (err) return cb(err);
        return cb(results);
      }
    );
  } catch (error) {
    cb(error);
  }
};

semester.add = function (data, cb) {
  const data1 = [
    data.year,
    data.session,
    new Date(data.startTime).toISOString().split("T")[0],
    new Date(data.endTime).toISOString().split("T")[0],
  ];
  try {
    db.query(
      "INSERT INTO `semester` (`Year`, `Session`, `StartTime`, `EndTime`) values (?, ?, ?,?)",
      data1,
      function (err, results) {
        if (err) return cb(err);
        return cb(results);
      }
    );
  } catch (error) {
    cb(error);
  }
};

module.exports = semester;
