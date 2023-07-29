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

semester.checkValidDate = function (s, e) {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM semester WHERE (? BETWEEN StartTime AND EndTime) OR (? BETWEEN StartTime AND EndTime) OR (StartTime BETWEEN ? AND ?) OR (EndTime BETWEEN ? AND ?);",
      [s, e, s, e, s, e],
      (err, result) => {
        if (err) {
          reject(err); // Đáng tin cậy hơn khi xử lý lỗi
        } else {
          if (result.length > 0) {
            resolve(false); // Có xung đột thời gian
          } else {
            resolve(true); // Không xung đột thời gian
          }
        }
      }
    );
  });
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
        if (err)
          return cb({
            status: 400,
            messaege: "Inset semester error",
          });
        return cb({
          status: 200,
          messaege: "Inset semester successfully",
        });
      }
    );
  } catch (error) {
    cb({
      status: 500,
      messaege: "Inset semester error",
    });
  }
};

semester.deleteByID = function (id, cb) {
  try {
    db.beginTransaction((err) => {
      if (err) {
        return cb({
          status: 501,
          message: "Error deleting course",
        });
      }

      // Cập nhật trạng thái "Status" của học kỳ có "Id" là "id" thành 0
      const updateSemesterQuery =
        "UPDATE `semester` SET `Status`=0  WHERE Id = ? and Status = 1";
      db.query(updateSemesterQuery, [id], function (err, data) {
        if (err) {
          return db.rollback(() => {
            return cb({
              status: 401,
              message: "Delete failed",
            });
          });
        }
      });

      // Cập nhật trạng thái "Status" của các khóa học liên quan
      const updateCoursesQuery =
        "UPDATE `course` SET `Status`= 0  WHERE SemesterId = ? and Status = 1";
      db.query(updateCoursesQuery, [id], function (err, data) {
        if (err) {
          return db.rollback(() => {
            return cb({
              status: 401,
              message: "Delete failed",
            });
          });
        }

        const updateGroupsQuery = `
          UPDATE project
          SET Status = 0
          WHERE CourseId IN (
            SELECT Id
            FROM course
            WHERE SemesterId = ?
          ) and Status = 1
        `;
        db.query(updateGroupsQuery, [id], function (err, data) {
          if (err) {
            return db.rollback(() => {
              return cb({
                status: 401,
                message: "Delete failed",
              });
            });
          }
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                return cb({
                  status: 501,
                  message: "Error deleting course",
                });
              });
            }

            return cb({
              status: 200,
              message: "Delete successful",
            });
          });
        });
      });
    });
  } catch (error) {
    return cb({
      status: 501,
      message: "Error deleting subject",
    });
  }
};

module.exports = semester;
