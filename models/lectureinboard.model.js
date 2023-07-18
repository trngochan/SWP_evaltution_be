const db = require("../common/connect");

const LecInBoard = function (LecInBoard) {
  this.id = LecInBoard.id;
  this.lectureId = LecInBoard.lectureId;
  this.EvulutionBroandId = LecInBoard.EvulutionBroandId;
};

LecInBoard.add = function (data, cb) {
  try {
    db.query(
      "INSERT INTO `lectureinboard`( `Lecture_id`, `EvaluationBoardId`) VALUES (?, ?)",
      [data.teacherId, data.boardId],
      function (err, data) {
        if (err)
          return cb({
            status: 401,
            message: "Failed to insrt lecture in board",
          });
        else
          return cb({
            status: 200,
            message: "Insert success",
          });
      }
    );
  } catch (error) {
    return cb({
      status: 500,
      message: "Error at add lecinboard",
    });
  }
};

LecInBoard.deleteByID = function (id, cb) {
  try {
    db.query(
      "UPDATE `lectureinboard` SET `Status`=0  WHERE Id = ? and Status = 1",
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

module.exports = LecInBoard;
