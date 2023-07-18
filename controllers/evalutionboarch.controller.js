const Evalution = require("../models/evalutionboarch.model");

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  Evalution.deleteByID(id, (result) => {
    res.send(result);
  });
};

exports.getAll = function (req, res) {
  Evalution.getAll((result) => {
    res.send(result);
  });
};

exports.getByProjectId = function (req, res) {
  const id = req.params.project;
  Evalution.getByProjectId(id, (result) => {
    res.send(result);
  });
};

exports.getById = function (req, res) {
  const id = req.params.board;
  Evalution.getById(id, (result) => {
    res.send(result);
  });
};

exports.getByTeacherId = function (req, res) {
  const teacherId = req.params.teacher;
  Evalution.getByTeacherId(teacherId, (result) => {
    res.send(result);
  });
};

exports.getByStdIdAndCourId = function (req, res) {
  const courId = req.cookies.course_id;
  const stdId = JSON.parse(req.cookies.user).id;
  Evalution.getByStdIdAndCourId(courId, stdId);
};

exports.add = function (req, res) {
  const data = req.body;
  Evalution.add(data, (result) => {
    res.send(result);
  });
};
