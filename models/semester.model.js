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
      "select * from semester where Status = 1",
      function (err, results) {
        if (err) return cb(err);
        return cb(results);
      }
    );
  } catch (error) {
    cb(error);
  }
};

semester.getById = function (id, cb) {
  try {
    db.query(
      "select * from semester where id = ? and status = 1",
      [id],
      function (err, results) {
        if (err)
          return cb({
            status: 400,
            messaege: "Get by id failed",
          });
        return cb({
          status: 200,
          data: results,
        });
      }
    );
  } catch (error) {
    console.log(error);
    cb({
      status: 500,
      messaege: "Error at get by id",
    });
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

semester.deleteByID = function (id, cb) {
  try {
    db.query(
      "UPDATE `semester` SET `Status`=0  WHERE Id = ? and Status = 1",
      [id],
      function (err, data) {
        if (err)
          return cb({
            status: 401,
            message: "Delete failed",
          });
        return cb({
          status: 200,
          message: "Delete successful",
        });
      }
    );
  } catch (error) {
    return cb({
      status: 501,
      message: "Error deleting course",
    });
  }
};

module.exports = semester;
