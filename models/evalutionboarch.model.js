const db = require("../common/connect");

const EvulutionBroand = function (evulutionBroand) {
  this.name = evulutionBroand.name;
  this.startTime = evulutionBroand.startTime;
  this.endTime = evulutionBroand.endTime;
  this.room = evulutionBroand.room;
};

EvulutionBroand.getAll = function (cb) {
  try {
    db.query("select * from eveluationboard", function (err, data) {
      if (err) cb(err);
      else cb(data);
    });
  } catch (error) {}
};

EvulutionBroand.getByProjectId = function (id, cb) {
  try {
    db.query(
      "select * from  eveluationboard, (select projectinboard.EvaluationBoardId from projectinboard WHERE projectinboard.ProjectId = ?  AND projectinboard.Status = 1) as eva WHERE eveluationboard.Id = eva.EvaluationBoardId AND eveluationboard.Status = 1",
      [id],
      function (err, result) {
        console.log(err);
        if (err)
          return cb({
            status: 401,
            message: "Insert failed",
          });
        return cb({
          status: 201,
          data: result,
        });
      }
    );
  } catch (error) {}
};

EvulutionBroand.getById = function (id, cb) {
  try {
    db.query(
      "SELECT * FROM `eveluationboard` where Id = ? and Status = 1",
      [id],
      function (err, result) {
        console.log(err);
        if (err)
          return cb({
            status: 401,
            message: "Insert failed",
          });
        return cb({
          status: 201,
          data: result,
        });
      }
    );
  } catch (error) {}
};

EvulutionBroand.returnById = function (id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM eveluationboard WHERE id = ${id} and Status = 1`,
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      }
    );
  });
};

EvulutionBroand.getByTeacherId = async function (id, cb) {
  try {
    // const query ="SELECT * FROM lectureinboard, eveluationboard WHERE lectureinboard.Lecture_id = 1 AND lectureinboard.EvaluationBoardId = eveluationboard.Id;"
    const data = await new Promise((resolve, reject) => {
      db.query(
        `SELECT lectureinboard.Id as lectureinboardID,eveluationboard.Id, Name, SemesterId, SubjectId, TemplateId, StartTime,EndTime,Room, Date FROM lectureinboard, eveluationboard WHERE lectureinboard.Lecture_id = ? AND lectureinboard.EvaluationBoardId = eveluationboard.Id AND lectureinboard.Status = 1 and eveluationboard.Status = 1`,
        [id],
        function (err, data) {
          if (err) reject(err);
          else resolve(data);
        }
      );
    });
    cb(data);
  } catch (error) {
    cb(error);
  }
};

EvulutionBroand.getByStdIdAndCourId = function (courId, stdId) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT projectinboard.EvaluationBoardId
      FROM (
        SELECT listPrjInStd.projectId
        FROM (
          SELECT project.id AS projectId
          FROM course, project
          WHERE course.id = ?
            AND course.Id = project.CourseId
            AND course.Status = 1
            AND project.Status = 1
        ) AS listPrjInCour,
        (
          SELECT studentinproject.ProjectId
          FROM student, studentinproject
          WHERE student.Id = ?
            AND studentinproject.StudentId = student.id
            AND studentinproject.Status = 1
            AND student.Status = 1
        ) AS listPrjInStd
        WHERE listPrjInCour.projectId = listPrjInStd.ProjectId
      ) AS project,
      projectinboard
      WHERE project.projectId = projectinboard.ProjectId;`,
      [courId, stdId],
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      }
    );
  });
};

EvulutionBroand.add = function (data, cb) {
  try {
    db.query(
      "INSERT INTO `eveluationboard`( `Name`, `SemesterId`, `SubjectId`, `TemplateId`, `StartTime`, `EndTime`, `Room`, date) VALUES (?,?,?,?,?,?,?,?)",
      [
        data.name,
        data.semesterId,
        data.subjectId,
        data.templateId,
        data.startTime,
        data.endTime,
        data.room,
        data.date,
      ],
      function (err, result) {
        console.log(err);
        if (err)
          return cb({
            status: 401,
            message: "Insert failed",
          });
        return cb({
          status: 201,
          message: "Insert succeeded",
        });
      }
    );
  } catch (error) {
    return cb({
      status: 401,
      message: "Error at evaluating insert",
    });
  }
};

module.exports = EvulutionBroand;
