const ProjectInBoard = require("../models/ProjectInBoard.model");

exports.insert = function (req, res) {
  const data = req.body;
  ProjectInBoard.insert(data, (result) => {
    res.send(result);
  });
};
