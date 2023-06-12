const db = require("../common/connect");

const ProjectInBoard = function (projectinboard) {
  this.Id = projectinboard.Id;
  this.projectId = projectinboard.projectId;
  this.evaluation = projectinboard.evaluation;
  this.intendTime = projectinboard.intendTime;
  this.order = projectinboard.order;
  this.projectTime = projectinboard.projectTime;
};

ProjectInBoard.insert = function (data, cb) {
  try {
    db.query(
      "INSERT INTO `projectinboard`(`ProjectId`, `EvaluationBoardId`, `IntendTime`, `Order`, `ProtectTime`) VALUES (?,?,?,?,?)",
      [
        data.projectId,
        data.boardId,
        data.intendTime,
        data.order,
        data.protectTime,
      ],
      (err, result) => {
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

module.exports = ProjectInBoard;
