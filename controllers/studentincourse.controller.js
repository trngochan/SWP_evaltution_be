const StudentInCourse = require("../models/studentincourse.model");

exports.add = function (req, res) {
  const data = req.body;
  StudentInCourse.add(data, (result) => {
    res.send(result);
  });
};

exports.deleteByID = function (req, res) {
  const id = req.params.id;
  StudentInCourse.deleteByID(id, (result) => {
    res.send(result);
  });
};
