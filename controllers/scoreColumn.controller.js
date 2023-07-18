const scoreColumn = require("../models/scoreColumn.model");

exports.getByTemplateId = function (req, res) {
  const id = req.params.template;
  scoreColumn.getByTemplateId(id, (result) => {
    res.send(result);
  });
};

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  scoreColumn.deleteByID(id, (result) => {
    res.send(result);
  });
};

exports.getBySubjectId = function (req, res) {
  const id = req.params.subject;
  scoreColumn.getBySubjectId(id, (result) => {
    res.send(result);
  });
};

exports.add = function (req, res) {
  const data = req.body;
  scoreColumn.add(data, (result) => {
    res.send(result);
  });
};
