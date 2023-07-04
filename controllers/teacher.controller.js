const Teacher = require("../services/teacher.service");

exports.getAll = function (req, res) {
  Teacher.getAll((result) => {
    res.send(result);
  });
};

exports.getById = function (req, res) {
  const id = req.params.id;
  Teacher.getById(id, (result) => {
    res.send(result);
  });
};

exports.add = function (req, res) {
  const data = req.body;
  Teacher.add(data, (result) => {
    res.send(result);
  });
};

exports.getByLectureInBoard = function (req, res) {
  const id = req.params.lectureInBoard;
  Teacher.getByLectureInBoard(id, (result) => {
    res.send(result);
  });
};

exports.getByStdIdAndCourId = function (req, res) {
  const courId = req.cookies.course_id;
  const stdId = JSON.parse(req.cookies.user).id;
  Teacher.getByStdIdAndCourId(courId, stdId, (result) => res.send(result));
};

exports.getQuanlityOfBoarnd = function (req, res) {
  const project = req.params.project;
  Teacher.getQuanlityOfBoarnd(project, (result) => res.send(result));
};

exports.getQuanMarkedOfBoarnd = function (req, res) {
  const project = req.params.project;
  Teacher.getQuanMarkedOfBoarnd(project, (result) => res.send(result));
};

exports.getNotIntBoard = function (req, res) {
  const board = req.params.board;
  Teacher.getNotIntBoard(board, (result) => res.send(result));
};

exports.deleteTeacher = function (req, res) {
  const teacher = req.params.teacher;
  Teacher.deleteTeacher(teacher, (result) => res.seng(result));
};

exports.editTeacher = function (req, res) {
  const data = req.body;
  Teacher.editTeacher(data, (result) => res.send(result));
};
