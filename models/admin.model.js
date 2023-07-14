const db = require("../common/connect");

const Admin = function (admin) {
  this.username = admin.username;
  this.password = admin.password;
  this.role = admin.role;
};

Admin.login = function (data, result) {
  const param = [data.username, data.password];
  console.log(param);
  try {
    db.query(
      "SELECT username, role, id, address  from admin where username = ? And password = ? and Status = 1",
      param,
      function (err, data) {
        if (err) {
          result(err);
        } else {
          if (data.length > 0)
            result({
              status: 200,
              data,
            });
          else
            result({
              status: 401,
              message: "Invalid username or password",
            });
        }
      }
    );
  } catch (error) {
    console.log("co loi");
  }
};

module.exports = Admin;
