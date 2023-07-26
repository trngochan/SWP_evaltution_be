const db = require("../common/connect");
const EvulutionBroand = require("../models/evalutionboarch.model");
const Teacher = require("../models/teacher.model");

Teacher.login = function (data, result) {
  const param = [data.username, data.password];
  try {
    db.query(
      "SELECT username, role, id, name from lecture where username = ? && password = ? and Status = 1 ",
      param,
      function (err, data) {
        if (err) {
          result(err);
        } else {
          if (data.length > 0)
            result({
              status: 200,
              data,
            });
          else
            result({
              status: 401,
              message: "Invalid username or password",
            });
        }
      }
    );
  } catch (error) {
    console.log("co lou");
  }
};

Teacher.getById = (id, cb) => {
  try {
    db.query(
      "SELECT * from lecture where id = ? and Status = 1 ",
      [id],
      function (err, data) {
        if (err) {
          return cb({
            status: 400,
            message: "Error getting",
          });
        }
        return cb({
          status: 200,
          data: data,
        });
      }
    );
  } catch (error) {
    console.log(error);
    cb({
      status: 500,
      message: "Error getting",
    });
  }
};

Teacher.checkDoubleUser = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM lecture WHERE username = ? and Status = 1";
    db.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

Teacher.add = async function (data, cb) {
  try {
    const duplicateUsers = await Teacher.checkDoubleUser(data.username);

    if (duplicateUsers.length > 0) {
      return cb({ status: 401, message: "Duplicate username" });
    } else {
      db.query(
        `INSERT INTO lecture (name, birthday,phonenumber, address, username, password, role) VALUES(?,?,?,?,?,?,"teach")`,
        [
          data.name,
          data.birthday,
          data.phone,
          data.address,
          data.username,
          data.password,
          data.role,
        ],
        function (err, data) {
          if (err) {
            console.log(err);
            cb({ status: 401, message: "Duplicate username" });
          } else {
            cb({
              status: 200,
              message: "Insert student success",
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return cb({ status: 500, message: "Internal server error" });
  }
};

Teacher.getAll = function (cb) {
  db.query(
    "SELECT id,name, birthday, phonenumber, address FROM lecture where lecture.Status = 1",
    function (err, data) {
      if (err) {
        cb(err);
      } else {
        cb(data);
      }
    }
  );
};

Teacher.getByLectureInBoard = function (id, cb) {
  db.query(
    `SELECT * FROM lecture, ( SELECT Lecture_id FROM lectureinboard, ( SELECT EvaluationBoardId FROM lectureinboard WHERE lectureinboard.Id = ? AND lectureinboard.Status = 1 ) AS evaInBoard WHERE lectureinboard.EvaluationBoardId = evaInBoard.EvaluationBoardId AND lectureinboard.Status = 1 ) AS listTeach WHERE lecture.id = listTeach.Lecture_id AND lecture.Status = 1;`,
    [id],
    function (err, data) {
      if (err) {
        cb(err);
      } else {
        cb(data);
      }
    }
  );
};

Teacher.getByLectureInBoard = function (id, cb) {
  db.query(
    `SELECT lecture.Id, Name, lecture.PhoneNumber, lecture.Address FROM lectureinboard, lecture WHERE lectureinboard.EvaluationBoardId = ? AND lectureinboard.Lecture_id = lecture.Id AND lectureinboard.Status = 1  AND lecture.Status = 1;`,
    [id],
    function (err, data) {
      if (err) {
        cb(err);
      } else {
        cb(data);
      }
    }
  );
};

Teacher.getByStdIdAndCourId = async function (courId, stdId, cb) {
  const evaluationId = await EvulutionBroand.getByStdIdAndCourId(courId, stdId);
  const a = evaluationId?.EvaluationBoardId;
  db.query(
    `select lectureinboard.Lecture_id, Name, BirthDay, PhoneNumber, Address, lectureinboard.Id as lectureinboardId from lecture, lectureinboard WHERE lectureinboard.EvaluationBoardId = ${a} and lectureinboard.Lecture_id = lecture.id  AND lecture.Status = 1 AND lectureinboard.Status = 1`,
    function (err, data) {
      if (err) {
        cb(err);
      } else {
        cb(data);
      }
    }
  );
};

Teacher.getQuanlityOfBoarnd = async function (projectId, cb) {
  db.query(
    `select COUNT(lectureinboard.Lecture_id) as totalTeacher FROM lectureinboard,(SELECT projectinboard.EvaluationBoardId from project, projectinboard WHERE project.Id = projectinboard.ProjectId and project.Id = ${projectId} AND project.Status = 1 AND projectinboard.Status = 1) as board WHERE lectureinboard.EvaluationBoardId = board.EvaluationBoardId AND lectureinboard.Status = 1;`,
    function (err, data) {
      if (err) {
        cb(err);
      } else {
        cb(data);
      }
    }
  );
};

Teacher.getQuanMarkedOfBoarnd = async function (projectId, cb) {
  db.query(
    `SELECT COUNT(DISTINCT score.LectureInBoardId) AS totalTeachersMark FROM score, (SELECT studentinproject.Id from project, studentinproject WHERE studentinproject.status = 1 and project.Status = 1 AND project.Id = studentinproject.ProjectId and project.Id = ${projectId} LIMIT 1) as stdinpro WHERE score.StudentInProjectId = stdinpro.id AND score.Status = 1;`,
    function (err, result) {
      if (err) {
        console.log(err);
        cb(err);
      } else {
        cb(result);
      }
    }
  );
};

Teacher.getNotIntBoard = async function (id, cb) {
  db.query(
    "SELECT * FROM lecture WHERE lecture.Id NOT IN (SELECT lectureinboard.Lecture_id from lectureinboard WHERE lectureinboard.Status = 1 AND lectureinboard.EvaluationBoardId = ?) AND lecture.Status = 1;",
    [id],
    function (err, result) {
      if (err) {
        cb(err);
      } else {
        cb(result);
      }
    }
  );
};

Teacher.editTeacher = function (data, cb) {
  try {
    db.query(
      "UPDATE `lecture` SET `Name`= ? ,`BirthDay`= ?,`PhoneNumber`= ?,`Address`= ? WHERE Id = ? ",
      [data.name, data.birthday, data.phonenumber, data.address, data.id],
      function (err, results) {
        if (err) {
          return cb({
            status: 401,
            message: "Update not allowed",
          });
        }
        return cb({
          status: 200,
          message: "Updated successfully",
        });
      }
    );
  } catch (error) {
    return cb({
      status: 401,
      massage: "Error edit teacher",
    });
  }
};

Teacher.deleteByID = function (id, cb) {
  try {
    db.query(
      "UPDATE `lecture` SET `Status`=0  WHERE Id = ? and Status = 1",
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

module.exports = Teacher;
