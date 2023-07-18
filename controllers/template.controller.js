const Template = require("../models/template.model");

exports.getAll = function (req, res) {
  Template.getAll((result) => {
    res.send(result);
  });
};

exports.add = function (req, res) {
  const data = req.body;
  Template.add(data, (result) => {
    res.send(result);
  });
};

exports.getById = function (req, res) {
  const id = req.params.id;
  Template.getById(id, (result) => {
    res.send(result);
  });
};

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  Template.deleteByID(id, (result) => {
    res.send(result);
  });
};
