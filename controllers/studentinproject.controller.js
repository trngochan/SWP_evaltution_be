const StudentInProject = require("../models/studentinproject.model");

exports.add = function (req, res) {
  const data = req.body;
  StudentInProject.add(data, (result) => {
    res.send(result);
  });
};

exports.remove = function (req, res) {
  const stdinprj = req.params.stdinprj;
  StudentInProject.remove(stdinprj, (result) => {
    res.send(result);
  });
};

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  StudentInProject.deleteByID(id, (result) => {
    res.send(result);
  });
};
