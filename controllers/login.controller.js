const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");

exports.loginStudent = function (req, res) {
  Student.login(req.body, function (respone) {
    if (respone.length > 0) {
      var token = jwt.sign(
        {
          username: respone?.[0]?.username,
          role: respone?.[0]?.role,
          id: respone?.[0]?.id
        },
        "mk"
      );
    } else {
      return res.status(400).send("Username or password is incorrect");
    }
    return res.json({
      token: token,
      data: respone,
    });
  });
};

exports.loginTeacher = function (req, res) {
  Teacher.login(req.body, function (respone) {
    if (respone.length > 0) {
      var token = jwt.sign(
        {
          username: respone?.[0]?.username,
          role: respone?.[0]?.role,
          id: respone?.[0]?.id
        },
        "mk"
      );
    } else {
      return res.status(401).json({
        message: "Username or password is incorrect",
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
    if (respone.length > 0) {
      var token = jwt.sign(
        {
          username: respone?.[0]?.username,
          role: respone?.[0]?.role,
          id: respone?.[0]?.id
        },
        "mk"
      );
    } else {
      return res.status(401).json({
        message: "Username or password is incorrect",
      });
    }
    return res.json({
      token: token,
      data: respone,
    });
  });
};
