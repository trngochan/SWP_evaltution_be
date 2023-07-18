const db = require("../common/connect");

const StudentInCourse = function (studentincourse) {
  this.id = studentincourse.id;
  this.studentId = studentincourse.studentId;
  this.courseId = studentincourse.courseId;
  this.status = studentincourse.status;
};

StudentInCourse.add = function (data, cb) {
  db.query(
    "INSERT INTO `studentincourse`( `CourseId`, `StudentId`, `Status`) VALUES (?,?,1)",
    [data.course, data.student],
    function (err, result) {
      if (err) {
        return cb(err);
      }
      return cb({
        message: "Success",
      });
    }
  );
};

StudentInCourse.deleteByID = function (id, cb) {
  try {
    db.query(
      "UPDATE `studentincourse` SET `Status`=0  WHERE Id = ? and Status = 1",
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

module.exports = StudentInCourse;
