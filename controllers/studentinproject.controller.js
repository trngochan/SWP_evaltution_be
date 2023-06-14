const StudentInProject = require("../models/studentinproject.model");

exports.add = function (req, res) {
  const data = req.body;
  StudentInProject.add(data, (result) => {
    res.send(result);
  });
};
