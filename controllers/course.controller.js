const Course = require("../models/course.model");

exports.getByStudentID = function (req, res) {
  const studentId = req.params.student;
  Course.getByStuentID(studentId, (result) => {
    res.send(result);
  });
};

exports.getBySemSub = function (req, res) {
  const sem = req.params.sem;
  const sub = req.params.sub;
  Course.getBySemSub(sem, sub, (result) => {
    res.send(result);
  });
};

exports.getBySubject = function (req, res) {
  const subject = req.params.subject;
  Course.getBySubject(subject, (result) => {
    res.send(result);
  });
};

exports.getByTeacherID = function (req, res) {
  const teacherId = req.params.teacher;
  Course.getByTeacherID(teacherId, (result) => {
    res.send(result);
  });
};

exports.add = function (req, res) {
  const data = req.body;
  Course.add(data, (result) => {
    res.send(result);
  });
};

exports.getAll = function (req, res) {
  Course.getAll((result) => {
    res.send(result);
  });
};

exports.getByID = function (req, res) {
  const course = req.params.course;
  Course.getByID(course, (result) => {
    res.send(result);
  });
};
