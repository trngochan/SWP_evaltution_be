var jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
  try {
    var token = req.cookies.token;
    console.log(token);

    var data = jwt.verify(token, "mk");
    console.log(data);
    if (data) {
      req.params.data = data;
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Token khong hop le",
    });
  }
};

module.exports = {
  checkLogin,
};
