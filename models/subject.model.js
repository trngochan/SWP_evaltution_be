const db = require("../common/connect");

const Subject = function (subject) {
  this.id = subject.id;
  this.name = subject.name;
  this.description = subject.description;
};

Subject.getAll = function (cb) {
  db.query(`SELECT * from subject where Status = 1`, function (err, result) {
    if (err) {
      cb(err);
      return;
    }
    cb(result);
  });
};

Subject.getById = function (id, cb) {
  try {
    db.query(
      "select * from subject where id = ? and Status = 1",
      [id],
      function (err, result) {
        if (err) return cb(err);
        return cb(result);
      }
    );
  } catch (error) {}
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

Subject.deleteByID = function (id, cb) {
  try {
    db.beginTransaction((err) => {
      if (err) {
        return cb({
          status: 501,
          message: "Error deleting subject",
        });
      }

      // Cập nhật trạng thái "Status" của học kỳ có "Id" là "id" thành 0
      const updateSemesterQuery =
        "UPDATE `subject` SET `Status`= 0  WHERE Id = ? and Status = 1";
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
        "UPDATE `course` SET `Status`= 0  WHERE SubjectId = ? and Status = 1";
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
            WHERE SubjectId = ?
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
                  message: "Error deleting subject",
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

module.exports = Subject;
