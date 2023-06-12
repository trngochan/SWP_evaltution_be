const db = require("../common/connect");
const Project = require("./project.model");

const Score = function (Score) {
  (this.courseId = Score.courseId),
    (this.StudentInProjectId = Score.StudentInProjectId),
    (this.LectureInBoardId = Score.LectureInBoardId),
    (this.LectureInBoardId = Score.LectureInBoardId),
    (this.score = Score.score);
};

Score.insertScore = function (dataScores, data, cb) {
  try {
    for (let key in dataScores) {
      let dataMake = [...data];
      dataMake[dataMake.length] = key;
      dataMake[dataMake.length] = dataScores[key];
      db.query(
        "INSERT INTO score (CourseId, StudentInProjectId, LectureInBoardId, ScoreColumnId, score) VALUES (?,?,?,?,?)",
        dataMake,
        (err, result) => {
          if (err) {
            cb(err);
          }
        }
      );
    }
    cb("thanh cong");
  } catch (error) {
    cb(error);
  }
};

Score.getScore = async function (stdid, courid, cb) {
  try {
    const StdiInPrj = await Project.getIdBystdandCourse(stdid, courid);
    db.query(
      `SELECT * from score where StudentInProjectId = ${StdiInPrj} and isAvarage = 1`,
      (err, result) => {
        if (err) return cb(err);
        if (result.length <= 0) {
          return cb({
            status: 204,
            message: "No public for you",
          });
        } else {
          return cb({
            status: 201,
            data: {
              score: result[0]?.Score,
              status: result[0]?.status,
            },
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

Score.calAvgScoreBystdInPrj = function (id, cb) {
  try {
    db.query(
      `INSERT INTO score (CourseId, StudentInProjectId, score, isAvarage, status)
      SELECT teacher_avg.CourseId, teacher_avg.StudentInProjectId, AVG(teacher_avg.avg_score) AS score,
             1 AS isAvarage,
             CASE WHEN AVG(teacher_avg.avg_score) > 5 THEN 1 ELSE 0 END AS status
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
