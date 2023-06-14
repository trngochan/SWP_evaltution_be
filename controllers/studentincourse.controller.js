const StudentInCourse = require("../models/studentincourse.model");

exports.add = function (req, res) {
  const data = req.body;
  StudentInCourse.add(data, (result) => {
    res.send(result);
  });
};
