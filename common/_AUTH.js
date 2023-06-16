var jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  try {
    var token = req.cookies.token;

    var data = jwt.verify(token, "mk");
    console.log(data);
    if (data) {
      req.params.data = data;
      next();
    }
  } catch (error) {
    res.json({
      status: 401,
      message: "Token khong hop le",
    });
  }
};

const checkStudent = (req, res, next) => {
  try {
    if (req.params.data.role == "std") {
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Token khong hop le",
    });
  }
};

const checkTeacher = (req, res, next) => {
  try {
    if (req.params.data.role == "teach") {
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Token khong hop le",
    });
  }
};

const checkAdmin = (req, res, next) => {
  try {
    if (req.params.data.role == "admin") {
      next();
    }
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Token khong hop le",
    });
  }
};

module.exports = {
  checkLogin,
  checkAdmin,
  checkTeacher,
  checkStudent,
};
