const Teacher = require("../models/teacher.model");

exports.getAll = function (req, res) {
  Teacher.getAll((result) => {
    res.send(result);
  });
};

exports.getByLectureInBoard = function (req, res) {
  const id = req.params.lectureInBoard;
  Teacher.getAll(id, (result) => {
    res.send(result);
  });
};

exports.getByStdIdAndCourId = function (req, res) {
  const courId = req.cookies.course_id;
  const stdId = JSON.parse(req.cookies.user).id;
  Teacher.getByStdIdAndCourId(courId, stdId, (result) => res.send(result));
};
