const db = require("../common/connect");

const Student = function (student) {
  this.username = student.username;
  this.password = student.password;
  this.role = student.role;
};

Student.login = function (data, result) {
  const param = [data.username, data.password];
  try {
    db.query(
      "SELECT username, role, id, address  from student where username = ? && password = ?",
      param,
      function (err, data) {
        if (err) {
          result(err);
        } else if (data.length == 0) {
          result(data);
        } else {
          result(data);
        }
      }
    );
  } catch (error) {
    console.log("co loi");
  }
};

Student.getAll = function (result) {
  try {
    db.query(
      "SELECT code, name, birthday, address  from student ",
      function (err, data) {
        if (err) {
          result(err);
        } else if (data.length == 0) {
          result(data);
        } else {
          result(data);
        }
      }
    );
  } catch (error) {
    console.log("co loi");
  }
};

Student.getById = function (id, result) {
  try {
    db.query(
      `SELECT code, name, birthday, address  from student where id = ${id}`,
      function (err, data) {
        if (err) {
          result(err);
        } else {
          result(data);
        }
      }
    );
  } catch (error) {
    console.log("co loi");
  }
};

Student.returnById = function (id) {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT code, name, birthday, address FROM student WHERE id = ${id}`,
      function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data[0]);
        }
      }
    );
  });
};

Student.getByProjectId = async function (id, result) {
  try {
    const data = await new Promise((resolve, reject) => {
      db.query(
        `SELECT studentid FROM studentinproject WHERE projectid = ${id}`,
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        }
      );
    });

    const dataStudent = [];

    for (let i = 0; i < data.length; i++) {
      const student = await Student.returnById(data[i].studentid);
      dataStudent.push(student);
    }

    result(dataStudent);
  } catch (error) {
    console.log(error);
  }
};

Student.getByCourseId = async function (id, result) {
  try {
    const data = await new Promise((resolve, reject) => {
      const quere = `SELECT code,name, birthday, address FROM student , studentincourse WHERE studentincourse.courseId = ${id} and student.Id = studentincourse.StudentId`;
      db.query(quere, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
    result(data)
  } catch (error) {
    result(error);
  }
};

Student.add = function (data, result) {
    try {
      db.query(
        `INSERT INTO student (code, name, birthday, address, username, password, role) VALUES(?,?,?,?,?,?,?)`,
        [data.code, data.name, data.birthday, data.address, data.username, data.password, data.role],
        function (err, data) {
          if (err) {
            result(err);
          } else {
            result(data);
          }
        }
      )
    } catch (error) {
        result(error);
    };
}

module.exports = Student;
