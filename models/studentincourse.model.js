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

module.exports = StudentInCourse;
