const db = require("../common/connect");

const StudentInProject = function (studentinproject) {
  this.id = studentinproject.id;
  this.studentId = studentinproject.studentId;
  this.projectId = studentinproject.projectId;
  this.status = studentinproject.status;
};

StudentInProject.add = function (data, cb) {
  db.query(
    "INSERT INTO `studentinproject`( `ProjectId`, `StudentId`) VALUES (?,?)",
    [data.project, data.student],
    function (err, result) {
      if (err) {
        console.log(err);
        return cb(err);
      }
      return cb({
        message: "Success",
      });
    }
  );
};

module.exports = StudentInProject;
