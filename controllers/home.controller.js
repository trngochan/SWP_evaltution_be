const jwt = require("jsonwebtoken");
const Student = require("../models/student.model");

exports.home = function (req, res) {
  req.session.a = 1;
  res.send(req.session);
};

exports.loginStudent = function (req, res) {
  Student.login(req.body, function (respone) {
    console.log(respone.length);
    if (respone.length > 0) {
      var token = jwt.sign(
        {
          username: respone?.[0]?.username,
          password: respone?.[0]?.password,
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
  Student.login(req.body, function (respone) {
    console.log(respone.length);
    if (respone.length > 0) {
      var token = jwt.sign(
        {
          username: respone?.[0]?.username,
          password: respone?.[0]?.password,
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
