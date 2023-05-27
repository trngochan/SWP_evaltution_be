const db = require('../common/connect');

const Teacher = function (teacher) {
    this.username = teacher.username;
    this.password = teacher.password;
    this.role = teacher.role;
  };

  Student.login = function (data,result) {
    const param = [data.username, data.password]
    try {
        db.query('SELECT username, role, id from lecture where username = ? && password = ?', param,function (err, data) {
            if(err) {
                result(err);
            }
            else if(data.length == 0) {
                result(data);
            } else {
                result(data);
            }

          })
    } catch (error) {
        console.log("co lou")
    }
};