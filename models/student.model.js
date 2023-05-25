const db = require('../common/connect');

const Student = function (student) {
    this.username = student.username;
    this.password = student.password;
    this.role = student.role;
  };

  Student.login = function (data,result) {
    const param = [data.username, data.password]
    try {
        db.query('SELECT username, password, role from student where username = ? && password = ?', param,function (err, data) {
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
        console.log("co loi")
    }
};

module.exports = Student;