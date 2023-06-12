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

EvulutionBroand.returnById = function (id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM eveluationboard WHERE id = ${id}`,
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
        `SELECT lectureinboard.Id as lectureinboardID,eveluationboard.Id, Name, SemesterId, SubjectId, TemplateId, StartTime,EndTime,Room FROM lectureinboard, eveluationboard WHERE lectureinboard.Lecture_id = ${id} AND lectureinboard.EvaluationBoardId = eveluationboard.Id`,
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
      `select projectinboard.EvaluationBoardId from (select listPrjInStd.projectId from (select project.id as projectId from course,project WHERE course.id = ${courId} and course.Id = project.CourseId) as listPrjInCour,	(select studentinproject.ProjectId from student,studentinproject WHERE student.Id = ${stdId} AND studentinproject.StudentId = student.id) as listPrjInStd where listPrjInCour.projectId = listPrjInStd.ProjectId) as project,projectinboard where project.projectId = projectinboard.ProjectId`,
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
      "INSERT INTO `eveluationboard`( `Name`, `SemesterId`, `SubjectId`, `TemplateId`, `StartTime`, `EndTime`, `Room`) VALUES (?,?,?,?,?,?,?)",
      [
        data.name,
        data.semesterId,
        data.subjectId,
        data.templateId,
        data.startTime,
        data.endTime,
        data.room,
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
