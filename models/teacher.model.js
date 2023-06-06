const db = require("../common/connect");
const EvulutionBroand = require("./evalutionboarch.model");

const Teacher = function (teacher) {
  this.username = teacher.username;
  this.password = teacher.password;
  this.role = teacher.role;
};

Teacher.login = function (data, result) {
  const param = [data.username, data.password];
  try {
    db.query(
      "SELECT username, role, id, name from lecture where username = ? && password = ?",
      param,
      function (err, data) {
        if (err) {
          result(err);
        } else {
          result(data);
        }
      }
    );
  } catch (error) {
    console.log("co lou");
  }
};

Teacher.getAll = function(cb) { 
    db.query("SELECT id,name, birthday, phonenumber, address FROM lecture", function (err, data) {
        if (err) {
            cb(err)
        } else {
            cb(data)
        }
    });
}

Teacher.getByLectureInBoard = function(id,cb) { 
  db.query(`select * from lecture,(select Lecture_id from lectureinboard,(select EvaluationBoardId from lectureinboard WHERE lectureinboard.Id = ${id}) as evaInBoard WHERE lectureinboard.EvaluationBoardId = evaInBoard.EvaluationBoardId) as listTeach WHERE lecture.id = listTeach.Lecture_id;`, function (err, data) {
      if (err) {
          cb(err)
      } else {
          cb(data)
      }
  });
}

Teacher.getByLectureInBoard = function(id,cb) { 
  db.query(`select * from lecture,(select Lecture_id from lectureinboard,(select EvaluationBoardId from lectureinboard WHERE lectureinboard.Id = ${id}) as evaInBoard WHERE lectureinboard.EvaluationBoardId = evaInBoard.EvaluationBoardId) as listTeach WHERE lecture.id = listTeach.Lecture_id;`, function (err, data) {
      if (err) {
          cb(err)
      } else {
          cb(data)
      }
  });
}

Teacher.getByStdIdAndCourId = async function(courId, stdId, cb) { 
  const evaluationId = await EvulutionBroand.getByStdIdAndCourId(courId, stdId);
  const a = evaluationId?.EvaluationBoardId;
    db.query(`select lectureinboard.Lecture_id, Name, BirthDay, PhoneNumber, Address, lectureinboard.Id as lectureinboardId from lecture, lectureinboard WHERE lectureinboard.EvaluationBoardId = ${a} and lectureinboard.Lecture_id = lecture.id`, function (err, data) {
        if (err) {
            cb(err)
        } else {
            cb(data)
        }
    });
}

module.exports = Teacher;