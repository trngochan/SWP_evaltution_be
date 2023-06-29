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

StudentInProject.remove = function (id, cb) {
  db.query(
    "UPDATE studentinproject SET Status = 0 where Id = ?;",
    [id],
    function (err, result) {
      if (err)
        return cb({
          status: 400,
          message: "Error deleting project",
        });
      return cb({
        status: 200,
        message: "Delete successfully",
      });
    }
  );
};

module.exports = StudentInProject;
