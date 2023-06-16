const Subject = require("../models/subject.model");

exports.getAll = function (req, res) {
  Subject.getAll((result) => {
    res.send(result);
  });
};

exports.add = function (req, res) {
  const data = req.body;
  Subject.add(data, (result) => {
    res.send(result);
  });
};

exports.getById = function (req, res) {
  const subject = req.params.subject;
  Subject.getById(subject, (result) => {
    res.send(result);
  });
};
