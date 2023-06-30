const db = require("../common/connect");

const Project = function (project) {
  (this.id = project.id),
    (this.name = project.name),
    (this.notion = project.notion);
};

Project.getPubliceds = function (cb) {
  try {
    db.query(
      "select DISTINCT studentinproject.ProjectId from score, studentinproject WHERE score.isAvarage = 1 AND score.StudentInProjectId = studentinproject.Id AND score.Status = 1 AND studentinproject.Status = 1;",
      (err, result) => {
        if (err)
          return cb({
            status: 401,
            message: "Insert failed",
          });
        return cb({
          status: 200,
          data: result,
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

Project.getProjectMarked = function (id, cb) {
  try {
    db.query(
      "SELECT DISTINCT studentinproject.ProjectId from studentinproject, (SELECT DISTINCT Score.StudentInProjectId FROM `score` WHERE LectureInBoardId = ? AND score.Status = 1) AS listStd WHERE studentinproject.Id = listStd.StudentInProjectId AND studentinproject.Status = 1",
      [id],
      (err, result) => {
        if (err)
          return cb({
            status: 401,
            message: "Error failed",
          });
        return cb({
          status: 200,
          result,
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
      `SELECT studentinproject.Id FROM project, studentinproject WHERE project.Id = studentinproject.ProjectId AND project.Id = ? AND project.Status = 1 AND studentinproject.Status = 1`,
      [id],
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
    db.query("SELECT * FROM project where Status = 1", (err, result) => {
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
    db.query(
      "SELECT * FROM project WHERE id =? and Status = 1",
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

Project.getByEvalutionId = function (id, cb) {
  try {
    db.query(
      "SELECT CourseId, project.id,name,notion, `order`, ProtectTime from projectinboard,project WHERE projectinboard.EvaluationBoardId = ? AND projectinboard.ProjectId = project.Id  AND projectinboard.Status = 1 and project.Status = 1;",
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
      `SELECT project.id as prjId, project.Name, notion, project.CourseId from course,project WHERE course.Id = project.CourseId AND course.id = ? AND course.Status = 1 AND project.Status = 1;`,
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
      JOIN project ON course.Id = project.CourseId AND course.Status = 1 AND project.Status = 1
      JOIN studentinproject ON studentinproject.ProjectId = project.id
      WHERE course.id = ? AND studentinproject.StudentId = ? AND studentinproject.Status = 1`,
      [courseId, studentId],
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
      `SELECT * from (select project.Id, project.Name, project.Notion, project.CourseId from project, (select course.id from eveluationboard, course WHERE eveluationboard.SemesterId = course.SemesterId AND eveluationboard.SubjectId = course.SubjectId and eveluationboard.Id = ? AND eveluationboard.Status = 1 AND course.Status = 1) as listCour WHERE listCour.id = project.CourseId AND project.Status = 1) as lisrProjecr WHERE lisrProjecr.Id NOT IN (SELECT projectinboard.ProjectId FROM projectinboard)`,
      [id],
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
      `select stdinproId FROM (SELECT studentinproject.ProjectId, studentinproject.Id as stdinproId from student, studentinproject WHERE student.Id = ? and student.id = studentinproject.StudentId AND student.Status = 1 AND studentinproject.Status = 1) prjofstd, (select project.Id from course, project WHERE course.id = ? AND course.id = project.CourseId AND course.Status = 1 AND project.Status = 1) prjincourse WHERE projectId = Id`,
      [stdid, courid],
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          if (result.length > 0) {
            resolve(result[0]?.stdinproId);
          } else {
            resolve(-1);
          }
        }
      }
    );
  });
};

module.exports = Project;
