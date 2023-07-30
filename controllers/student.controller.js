const Student = require("../models/student.model");

exports.getAll = function (req, res) {
  Student.getAll((result) => {
    res.send(result);
  });
};

exports.getByProjectId = function (req, res) {
  const projectId = req.params.project;
  Student.getByProjectId(projectId, (result) => {
    res.send(result);
  });
};

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  Student.deleteByID(id, (result) => {
    res.send(result);
  });
};

exports.getByCourseId = function (req, res) {
  const courseId = req.params.course;
  Student.getByCourseId(courseId, (result) => {
    res.send(result);
  });
};

exports.getByNohasProject = function (req, res) {
  const courseId = req.params.course;
  Student.getByNohasProject(courseId, (result) => {
    res.send(result);
  });
};

exports.getById = function (req, res) {
  const studentId = req.params.student;
  Student.getById(studentId, (result) => {
    res.send(result);
  });
};

exports.add = function (req, res) {
  const data = req.body;
  Student.add(data, (result) => {
    res.send(result);
  });
};

exports.update = function (req, res) {
  const data = req.body;
  Student.update(data, (result) => {
    res.send(result);
  });
};

exports.getStdInCourNotInProject = function (req, res) {
  const course = req.params.course;
  Student.getStdInCourNotInProject(course, (result) => {
    res.send(result);
  });
};

exports.getStdNotInCour = function (req, res) {
  const course = req.params.course;
  Student.getStdNotInCour(course, (result) => {
    res.send(result);
  });
};

exports.getStdNotInPrj = function (req, res) {
  const project = req.params.project;
  Student.getStdNotInPrj(project, (result) => {
    res.send(result);
  });
};
