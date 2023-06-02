const db = require("../common/connect");

const Project = function (project) {
  (this.id = project.id),
    (this.name = project.name),
    (this.notion = project.notion);
};

Project.getAll = function (cb) {
  try {
    db.query("SELECT * FROM project", (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(result);
      }
    });
  } catch (error) {
    cb(error);
  }
};

Project.getById = function (id, cb) {
  try {
    db.query("SELECT * FROM project WHERE id =?", [id], (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(result);
      }
    });
  } catch (error) {
    cb(error);
  }
};

Project.getByEvalutionId = function (id, cb) {
  try {
    db.query(
      "SELECT CourseId, project.id,name,notion, `order`, ProtectTime from projectinboard,project WHERE projectinboard.EvaluationBoardId = ? AND projectinboard.ProjectId = project.Id;",
      [id],
      (err, result) => {
        if (err) {
          cb(err);
        } else {
          cb(result);
        }
      }
    );
  } catch (error) {
    cb(error);
  }
};

Project.getByCourseId = function (id, cb) {
  try {
    db.query(
      `SELECT project.id as prjId, project.Name, notion, project.CourseId from course,project WHERE course.Id = project.CourseId AND course.id = ${id};`,
      [id],
      (err, result) => {
        if (err) {
          cb(err);
        } else {
          cb(result);
        }
      }
    );
  } catch (error) {
    cb(error);
  }
};

Project.getIDStdInCourseByCourseIdAndStdId = function (courseId, studentId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT studentinproject.id
      FROM course
      JOIN project ON course.Id = project.CourseId
      JOIN studentinproject ON studentinproject.ProjectId = project.id
      WHERE course.id = ${courseId} AND studentinproject.StudentId = ${studentId}`,
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = Project;
