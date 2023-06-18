const db = require("../common/connect");

const Project = function (project) {
  (this.id = project.id),
    (this.name = project.name),
    (this.notion = project.notion);
};

Project.update = function (data, cb) {
  try {
    db.query(
      "UPDATE `project` SET `Name`= ? ,`Notion`=? WHERE Id = ?",
      [data.name, data.notion, data.id],
      (err, result) => {
        console.log(err);
        if (err)
          return cb({
            status: 401,
            message: "Insert failed",
          });
        return cb({
          status: 200,
          message: "Success",
        });
      }
    );
  } catch (error) {
    cb({
      status: 500,
      message: "Internal error in project update",
    });
  }
};

Project.add = function (data, cb) {
  try {
    db.query(
      "INSERT INTO `project`(`Name`, `Notion`, `courseId`) VALUES (?, ?, ?)",
      [data.name, data.notion, data.courseId],
      (err, result) => {
        console.log(err);
        if (err)
          return cb({
            status: 401,
            message: "Insert failed",
          });
        return cb({
          status: 200,
          message: "Success",
        });
      }
    );
  } catch (error) {
    cb({
      status: 500,
      message: "Internal error in project add",
    });
  }
};

Project.getStdInProIdById = function (id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT studentinproject.Id FROM project, studentinproject WHERE project.Id = studentinproject.ProjectId AND project.Id = ${id}`,
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
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

Project.getProjectNoHasBoard = function (id) {
  return new Promise(function (resolve, reject) {
    db.query(
      `SELECT * from (select project.Id, project.Name, project.Notion, project.CourseId from project, (select course.id from eveluationboard, course WHERE eveluationboard.SemesterId = course.SemesterId AND eveluationboard.SubjectId = course.SubjectId and eveluationboard.Id = ${id}) as listCour WHERE listCour.id = project.CourseId) as lisrProjecr WHERE lisrProjecr.Id NOT IN (SELECT projectinboard.ProjectId FROM projectinboard)`,
      function (err, data) {
        if (err) {
          reject({
            status: 401,
            message: "Error in projectinboard",
          });
        } else {
          resolve({
            status: 201,
            data: data,
          });
        }
      }
    );
  });
};

Project.getIdBystdandCourse = function (stdid, courid) {
  return new Promise(function (resolve, reject) {
    db.query(
      `select stdinproId FROM (SELECT studentinproject.ProjectId, studentinproject.Id as stdinproId from student, studentinproject WHERE student.Id = ${stdid} and student.id = studentinproject.StudentId) prjofstd, (select project.Id from course, project WHERE course.id = ${courid} AND course.id = project.CourseId) prjincourse WHERE projectId = Id`,
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result[0]?.stdinproId);
        }
      }
    );
  });
};

module.exports = Project;
