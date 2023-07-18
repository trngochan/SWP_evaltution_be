const LecInBoard = require("../models/lectureinboard.model");

exports.add = function (req, res) {
  const data = req.body;
  LecInBoard.add(data, (result) => res.send(result));
};

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  LecInBoard.deleteByID(id, (result) => {
    res.send(result);
  });
};
