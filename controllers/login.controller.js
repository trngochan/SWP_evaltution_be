const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const Teacher = require("../services/teacher.service");

exports.loginStudent = function (req, res) {
  Student.login(req.body, function (respone) {
    if (respone.status === 200) {
      var token = jwt.sign(
        {
          username: respone?.data[0]?.username,
          role: respone?.data[0]?.role,
          id: respone?.data[0]?.id,
        },
        "mk"
      );
      return res.json({
        token: token,
        data: respone,
      });
    } else {
      return res.json({
        data: respone,
      });
    }
  });
};

exports.loginTeacher = function (req, res) {
  Teacher.login(req.body, function (respone) {
    if (respone.status === 200) {
      var token = jwt.sign(
        {
          username: respone?.data[0]?.username,
          role: respone?.data[0]?.role,
          id: respone?.data[0]?.id,
        },
        "mk"
      );
    } else {
      return res.json({
        data: respone,
      });
    }
    return res.json({
      token: token,
      data: respone,
    });
  });
};

exports.loginAdmin = function (req, res) {
  Student.login(req.body, function (respone) {
    if (respone.status === 200) {
      var token = jwt.sign(
        {
          username: respone?.data[0]?.username,
          role: respone?.data[0]?.role,
          id: respone?.data[0]?.id,
        },
        "mk"
      );
    } else {
      return res.json({
        data: respone,
      });
    }
    return res.json({
      token: token,
      data: respone,
    });
  });
};
