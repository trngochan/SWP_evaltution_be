const db = require("../common/connect");
const Project = require("./project.model");

const Score = function (Score) {
  (this.courseId = Score.courseId),
    (this.StudentInProjectId = Score.StudentInProjectId),
    (this.LectureInBoardId = Score.LectureInBoardId),
    (this.LectureInBoardId = Score.LectureInBoardId),
    (this.score = Score.score);
};

Score.getByLiBStdPrj = function (lib, std, prj, cb) {
  try {
    db.query(
      "SELECT P.StudentId,P.Id, score.ScoreColumnId, score.Score FROM (SELECT studentinproject.Id, studentinproject.StudentId FROM studentinproject WHERE studentinproject.StudentId = ? AND studentinproject.ProjectId = ? AND studentinproject.Status = 1) AS P, score WHERE P.Id = score.StudentInProjectId AND score.Status = 1 AND score.isAvarage IS NULL AND score.LectureInBoardId = ?",
      [std, prj, lib],
      function (err, result) {
        if (err) {
          console.log(err);
          return cb({
            status: 401,
            message: "Failed to getByLiBStdPrj",
          });
        }
        return cb({
          status: 200,
          data: result,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return cb({
      status: 500,
      message: "Error at add getByLiBStdPrj",
    });
  }
};

Score.updateScore = function (data, cb) {
  try {
    db.query(
      "UPDATE `score` SET `score`= ?  WHERE `CourseId`= ?  AND `StudentInProjectId`= ?  AND `LectureInBoardId`= ?  AND `ScoreColumnId`= ? AND Status = 1",
      [
        data.score,
        data.course,
        data.stdInPro,
        data.lecInBoard,
        data.scoreColumnId,
      ],
      function (err, result) {
        if (err) {
          console.log(err);
          return cb({
            status: 401,
            message: "Failed to updateScore",
          });
        }
        return cb({
          status: 200,
          data: "Update score successfully",
        });
      }
    );
  } catch (error) {
    console.log(error);
    return cb({
      status: 500,
      message: "Error at add updateScore",
    });
  }
};

Score.insertScore = function (dataInfor, dataScores, cb) {
  try {
    for (let key in dataScores) {
      let dataMake = [...dataInfor];
      dataMake[dataMake.length] = key;
      dataMake[dataMake.length] = dataScores[key];
      db.query(
        "INSERT INTO score (CourseId, StudentInProjectId, LectureInBoardId, ScoreColumnId, score) VALUES (?,?,?,?,?)",
        dataMake,
        (err, result) => {
          if (err) {
            return cb(err);
          }
        }
      );
    }
    return cb("thanh cong");
  } catch (error) {
    cb(error);
  }
};

Score.getScore = async function (stdid, courid, cb) {
  try {
    const StdiInPrj = await Project.getIdBystdandCourse(stdid, courid);
    console.log(StdiInPrj);
    if (StdiInPrj == -1) {
      return cb({
        status: 204,
        message: "Score not public",
      });
    } else {
      db.query(
        `SELECT * from score where StudentInProjectId = ${StdiInPrj} and isAvarage = 1 and Status = 1`,
        (err, result) => {
          if (err) return cb(err);
          if (result.length <= 0) {
            return cb({
              status: 204,
              message: "Score not public",
            });
          } else {
            return cb({
              status: 201,
              data: {
                score: result[0]?.Score,
                status: result[0]?.Result,
              },
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

Score.calAvgScoreBystdInPrj = function (id, cb) {
  try {
    db.query(
      `INSERT INTO score (CourseId, StudentInProjectId, score, isAvarage, Result)
      SELECT teacher_avg.CourseId, teacher_avg.StudentInProjectId, AVG(teacher_avg.avg_score) AS score,
             1 AS isAvarage,
             CASE WHEN AVG(teacher_avg.avg_score) > 5 THEN 1 ELSE 0 END AS Result
      FROM (
        SELECT SUM(s.Score * c.Percent) AS avg_score, s.CourseId, s.StudentInProjectId
        FROM score s
        JOIN scorecolumn c ON s.ScoreColumnId = c.Id
        WHERE s.StudentInProjectId = ${id}
        GROUP BY s.LectureInBoardId
      ) AS teacher_avg;`,
      (err, result) => {
        if (err) {
          return cb({
            status: 401,
            message: "Error: " + err.message,
          });
        }
        return cb({
          status: 200,
          message: "Success",
        });
      }
    );
  } catch (error) {
    return cb({
      status: 401,
      message: "Error: " + error.message,
    });
  }
};

module.exports = Score;
